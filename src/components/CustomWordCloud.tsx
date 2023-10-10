"use client";
import { useTheme } from "next-themes";
import { TagCloud } from "react-tagcloud";

type wordCloud = {
  value: string;
  count: number;
};

const data: wordCloud[] = [
  { value: "JavaScript", count: 15 },
  { value: "NextJS", count: 25 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 40 },
  { value: "Express.js", count: 17 },
  { value: "HTML5", count: 33 },
  { value: "VueJS", count: 20 },
  { value: "MongoDB", count: 18 },
  { value: "Laravel", count: 31 },
  { value: "CSS3", count: 20 },
  { value: "NuxtJS", count: 14 },
  { value: "jQuery", count: 25 },
  { value: "MongoDB", count: 27 },
  { value: "JavaScript", count: 32 },
  { value: "React", count: 34 },
  { value: "Nodejs", count: 16 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "CSS3", count: 20 },
  { value: "Webpack", count: 22 },
  { value: "Babel.js", count: 7 },
  { value: "ECMAScript", count: 25 },
  { value: "Jest", count: 15 },
  { value: "Mocha", count: 17 },
  { value: "React Native", count: 27 },
  { value: "Angular.js", count: 30 },
  { value: "TypeScript", count: 15 },
  { value: "Flow", count: 35 },
  { value: "NPM", count: 11 },
];

export function CustomWordCloud() {
  const theme = useTheme();
  const customRenderer = (tag: wordCloud, size: number, color: string) => (
    <span
      key={+tag.value || 2 * Math.random() * (1 - 10) + 1}
      style={{        
        fontSize: `${size / 2}em`,
        background: `${color}`,
        border: `2px solid ${color} * 2`,
        borderRadius: "6px",
        margin: "3px",
        padding: "3px",
        cursor: "pointer",
        display: "inline-block",
        color: theme.theme === "dark" ? "white" : "black",
      }}
    >
      {tag.value}
    </span>
  );

  return (
    <TagCloud
      tags={data}
      minSize={1}
      maxSize={5}
      colorOptions={{ format: "rgb" }}
      renderer={customRenderer}
      onClick={(tag: wordCloud) => alert(`'${tag.value}' was selected!`)}
    />
  );
}
