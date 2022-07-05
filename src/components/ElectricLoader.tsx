import { useEffect } from "react";
import styled from "styled-components";

const ElectricLoaderEl = styled.div`
  z-index: 3;
  .electric-loader {
    z-index: 3;

    position: absolute;
    top: 0;
    right: 5px;
    bottom: 0;
    left: 0;

    margin: auto;
    width: 80%;
    /* width: 80vw; */
    height: auto;
    /* max-width: 600px; */
  }

  .electric-loader path {
    fill: none;
    stroke: #a5f2e7;
    stroke-width: 0.6;

    stroke-dasharray: 300;
    stroke-dashoffset: -300;

    animation: stroke-anim 2s steps(40) infinite,
      stroke-color 0.6s steps(10) alternate infinite;
  }

  @keyframes stroke-anim {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes stroke-color {
    to {
      stroke: #49beb7;
    }
  }
`;
type SvgInHtml = SVGGeometryElement;
// (HTMLElement & SVGElement) |
const ElectricLoader = () => {
  var svgns = "http://www.w3.org/2000/svg";
  var twoPI = Math.PI * 2;

  function ElectricLine(radius = 48, startOffset = 0) {
    var path: SvgInHtml = document.createElementNS(svgns, "path") as SvgInHtml;

    var coords: number[] = [];
    var centerX = 50;
    var centerY = 50;

    for (var i = 0; i <= twoPI + 0.1; i += 0.1) {
      coords.push(
        centerX + Math.sin(i + startOffset) * radius,
        centerY + Math.cos(i + startOffset) * radius
      );
    }

    // Slightly randomize the points

    path.style.animationDelay = "0s, " + -Math.random() + "s";
    //path.style.animationDuration = (1.5 + Math.random()) + 's, ' + 0.2 + ( Math.random() * 0.4 ) + 's';

    function updateElectricLine() {
      path.setAttribute(
        "d",
        coords
          .map((point, i) => {
            return (
              (i === 0 ? "M" : i % 2 === 0 ? "L" : ",") +
              Math.round((point + Math.random() * 3) * 100) / 100
            );
          })
          .join("")
      );
    }

    // Have to get it in the dom for `getTotalLength` to work
    var tempSVG = document.createElementNS(svgns, "svg");
    tempSVG.appendChild(path);
    document.body.appendChild(tempSVG);

    // Get the line length
    var length = path.getTotalLength();
    document.body.removeChild(tempSVG);

    // Set an accurate strokeDasharray & offset for the animation
    path.style.strokeDasharray = (length / 2).toString(); //( length * 0.48 ) + ' ' + ( length * 0.52 );
    path.style.strokeDashoffset = (-length).toString();

    return {
      el: path,
      update: updateElectricLine,
    };
  }
  useEffect(() => {
    var lines = [
      ElectricLine(35, Math.PI * 0.0),
      ElectricLine(34.5, Math.PI * 1.0),
      ElectricLine(34, Math.PI * 0.25),
      ElectricLine(33.5, Math.PI * 1.25),
      //   ElectricLine(33, Math.PI * 0.5),
      //   ElectricLine(32.5, Math.PI * 1.5),
    ];

    var svg = document.querySelector(".electric-loader g");
    lines.forEach((line) => {
      if (!svg) return;
      svg.appendChild(line.el);
    });

    var t = 0;
    function update() {
      requestAnimationFrame(update);
      if (t % 7 === 0) lines.map((line) => line.update());
      t++;
    }

    update();
    return () => {
      lines.map((line) => line.el.remove());
    };
  }, []);

  return (
    <ElectricLoaderEl>
      <svg className="electric-loader" viewBox="0 0 100 100">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 17 -2.15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="over" />
          </filter>
        </defs>
        <g filter="url(#goo)"></g>
      </svg>
    </ElectricLoaderEl>
  );
};

export default ElectricLoader;
