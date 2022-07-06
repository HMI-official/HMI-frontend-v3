import React from "react";

interface IStates {
  isDown: boolean;
  startX: number;
  transLeftOffset: number;
  dragSpeed: number;
}

interface Props {
  children: React.ReactNode;
  _data: any[];
  dragSpeed: number;
  itemWidth: number;
  itemHeight: number;
  itemSideOffsets: number;
  carouselRef: HTMLDivElement | null;
}
class CarouselOrigin extends React.Component<Props, IStates> {
  cRef: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      isDown: false,
      startX: 0,
      transLeftOffset: 0,
      dragSpeed: props.dragSpeed,
    };
    this.cRef = React.createRef();
  }

  // mouse Down
  handleMouseDown = (e: any) => {
    const carousel = this.cRef.current;

    // this is due to the error that is been recived in console
    // this will make sure that 'e' is gonna passed to the callback function in setState
    // MORE INFO: https://reactjs.org/docs/events.html#event-pooling
    e.persist();

    carousel.classList.add("active");

    const _startX = e.pageX - carousel.offsetLeft;
    const _transLeftOffset = this.giveMeIntValOf(
      carousel.firstChild.style.transform
    );
    this.setState(
      {
        isDown: true,
        startX: _startX,
        transLeftOffset: _transLeftOffset,
      },
      () => {
        // handeling reset the transition
        const { startX, transLeftOffset, dragSpeed } = this.state;

        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * dragSpeed;

        carousel.firstChild.style.cssText = `
        transform: translateX(${transLeftOffset + walk}px);
        transition: transform 0.0s ease-in-out;
      `;
      }
    );
  };

  // mouse Leave
  handleMouseLeave = (e: any) => {
    this.handleSnap();
  };

  // mouse Up
  handleMouseUp = (e: any) => {
    this.handleSnap();
  };

  // mouse Move
  handleMouseMove = (e: any) => {
    const { isDown, startX, transLeftOffset, dragSpeed } = this.state;
    const carousel = this.cRef.current;

    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * dragSpeed;

    carousel.firstChild.style.transform = `translateX(${
      transLeftOffset + walk
    }px)`;
  };

  // handle Snap To Sides
  handleSnap = () => {
    // const { isDown, startX, transLeftOffset } = this.state
    const { _data, itemWidth, itemSideOffsets } = this.props;
    const carousel = this.cRef.current;

    // Resetting
    this.setState({ isDown: false });
    carousel.classList.remove("active");

    // handeling Threshold
    // (1) getting transValue
    const tempThresholdOffset = this.giveMeIntValOf(
      carousel.firstChild.style.transform
    );
    // (2) items width - 30(first & last item removed margins) - containerWidth(b/c of ending part)
    const end =
      _data.length * (itemWidth + 2 * itemSideOffsets) -
      30 -
      carousel.offsetWidth;

    // (3) check if we passing from threshold ( handeling Snap To Sides )
    if (tempThresholdOffset < 0 || tempThresholdOffset > end) {
      this.setState({ isDown: false });
      //   console.log("end", end);
      carousel.firstChild.style.cssText = `
        transform: translateX(${tempThresholdOffset < 0 ? 0 : end}px);
        transition: transform 0.5s cubic-bezier(.25,.72,.51,.96);
      `;
    }
  };

  // helper Function
  giveMeIntValOf = (el: any) => {
    // extracting 20 from translateX(20px) and converting it to integer with parsInt
    return parseInt(el.replace("translateX(", "").replace("px)", ""), 10);
  };

  render() {
    const { _data, itemWidth, itemHeight, itemSideOffsets } = this.props;

    const cWrapperStyle = {
      width: `${_data.length * (itemWidth + 2 * itemSideOffsets)}px`,
      height: `${itemHeight}px`,
    };

    // 여기부터 추가
    const carousel = this.cRef.current;
    const _end =
      _data.length * (itemWidth + 2 * itemSideOffsets) -
      30 -
      carousel?.offsetWidth;

    return (
      <div
        className="carousel"
        ref={this.cRef}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <div
          className="cWrapper"
          style={{
            ...cWrapperStyle,
            transform: `translateX(${_end}px)`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CarouselOrigin;
