import { useState } from "react";
import "./App.css";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: ".cache",
          children: [
            {
              name: "some file in .cache",
            },
          ],
        },
      ],
    },
    {
      name: "public",
      children: [
        {
          name: "index.html",
        },
      ],
    },
    {
      name: "package.json",
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

function Entry({ entry, depth }: { entry: TEntry; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      {entry.children ? (
        <button
          className="entry"
          onClick={() => setIsExpanded((oldValue) => !oldValue)}
        >
          {isExpanded ? "- " : "+ "} {entry.name}
        </button>
      ) : (
        <div className="singleFile">{entry.name}</div>
      )}

      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="files">
        {files.children.map((entry) => (
          <Entry entry={entry} depth={1} />
        ))}
      </div>
    </div>
  );
}

export default App;
