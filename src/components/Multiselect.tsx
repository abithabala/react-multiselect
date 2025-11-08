import React, { useEffect, useRef, useState } from "react";
import "./Multiselect.css";

type DDProps = {
  data: string[];
  onChange: (selected: string[]) => void;
};

export const Multiselect: React.FC<DDProps> = ({ data, onChange }) => {
  const [items, seItems] = useState<string[]>(data);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown container

  useEffect(() => {
    seItems(data);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("dropDo : ", dropdownRef);
      console.log("Target : ", event.target);

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.currentTarget;
    const child = parent.querySelector("span.item-select-icon");

    if (!child) return;

    child.classList.toggle("active");
    parent.classList.toggle("active");
  };

  const handleClick = (e: any, item: string) => {
    let updatedSelectedItems: string[] = [];

    if (!selectedItems) {
      setSelectedItems([item]);
      updatedSelectedItems = [item];
    } else if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      updatedSelectedItems = selectedItems.filter((i) => i !== item);
    } else {
      setSelectedItems([...selectedItems, item]);
      updatedSelectedItems = [...selectedItems, item];
    }
    onChange(updatedSelectedItems);
    handleItemClick(e);
  };

  return (
    <div
      className="dropdown-holder"
      ref={dropdownRef}
      title={selectedItems && selectedItems.join(",")}
    >
      <div
        className={`dropdown-box ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="dropdown-selected">
          {selectedItems && selectedItems.length > 0
            ? selectedItems.length > 3
              ? `(${selectedItems.length})  Selected`
              : selectedItems.join(",")
            : "Select items"}
        </div>
        <div className="dropdown-arrow">&#9662;</div>
      </div>
      <div className={`dropdown-list ${open ? "open" : ""}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={(e) => handleClick(e, item)}
          >
            <span className="item-select-icon"></span>
            <span className="item-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
