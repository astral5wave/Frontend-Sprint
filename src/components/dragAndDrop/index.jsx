import React from "react";

export default function UpdatedDesign() {
  const [columns, setColumns] = React.useState([
    ["Alice", "David", "Sophia", "Liam"],
    ["Maya", "Ethan", "Lucas"],
  ]);
  const div1 = React.useRef(null);
  const div2 = React.useRef(null);
  React.useEffect(() => {
    if (!div1 || !div2) return;
    const handleDefault = (e) => {
      e.preventDefault();
    };
    const handleDrop1 = (e) => {
      e.preventDefault();
      setColumns((columns) => {
        const data = e.dataTransfer.getData("data");
        return [
          [...columns[0].filter((item) => item !== data), data],
          columns[1].filter((item) => item !== data),
        ];
      });
    };
    const handleDrop2 = (e) => {
      e.preventDefault();
      setColumns((columns) => {
        const data = e.dataTransfer.getData("data");
        return [
          columns[0].filter((item) => item !== data),
          [...columns[1].filter((item) => item !== data), data],
        ];
      });
    };
    div1.current.addEventListener("dragover", handleDefault);
    div1.current.addEventListener("drop", handleDrop1);
    div2.current.addEventListener("dragover", handleDefault);
    div2.current.addEventListener("drop", handleDrop2);
    return () => {
      div1.current?.removeEventListener("dragover", handleDefault);
      div2.current?.removeEventListener("dragover", handleDefault);
      div1.current?.removeEventListener("drop", handleDrop1);
      div2.current?.removeEventListener("drop", handleDrop2);
    };
  }, []);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
  <div className="h-[95%] w-[95%] rounded-2xl shadow-2xl bg-white flex flex-col gap-6 p-6 overflow-hidden">

    <h1 className="font-bold text-5xl tracking-tight text-slate-800">
      Drag and Drop
    </h1>

    <div className="flex-1 bg-slate-900/30 shadow-2xl rounded-2xl grid grid-cols-2 gap-6 p-6 overflow-hidden">

      <div
        ref={div1}
        className="bg-zinc-50 rounded-xl shadow-xl p-4 overflow-y-auto space-y-3 border border-zinc-200"
      >
        <h2 className="text-2xl font-bold mb-2 text-stone-700 sticky">Interested</h2>

        {columns[0].map((item, idx) => (
          <div
            draggable="true"
            onDragStart={(e) => {
              e.dataTransfer.setData('data', item);
            }}
            key={idx}
            className="w-full p-4 rounded-lg text-lg font-semibold shadow-sm bg-emerald-100 text-emerald-900 border border-emerald-200"
          >
            {item}
          </div>
        ))}
      </div>

      <div
        ref={div2}
        className="bg-zinc-50 rounded-xl shadow-xl p-4 overflow-y-auto space-y-3 border border-zinc-200"
      >
        <h2 className="text-2xl font-bold mb-2 text-stone-700 sticky">Not Interested</h2>

        {columns[1].map((item, idx) => (
          <div
            draggable="true"
            onDragStart={(e) => {
              e.dataTransfer.setData('data', item);
            }}
            key={idx}
            className="w-full p-4 rounded-lg text-lg font-semibold shadow-sm bg-rose-100 text-rose-900 border border-rose-200"
          >
            {item}
          </div>
        ))}
      </div>

    </div>
  </div>
</div>

  );
}
