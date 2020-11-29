import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Leaf.css";
import { getFormattedValue, isArray, isObject, isParent } from "../../utils";

function Leaf({ node, title, isLast }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBracket = isArray(node) ? "[" : "{";
  const closeBracket = isArray(node) ? "]" : "}";
  const signSymbol = isOpen ? "-" : "+";

  const onLeafToggle = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
  };

  const getContent = () => {
    if (!isOpen) return null;
    if (isArray(node)) {
      return node.map((value, idx) => {
        if (isArray(value) || isObject(value)) {
          return (
            <li key={idx}>
              {<Leaf isLast={idx === node.length - 1} node={value} />}
            </li>
          );
        }

        return (
          <li className="array-value" key={idx}>
            {getFormattedValue(value)}
            {idx < node.length - 1 && ","}
          </li>
        );
      });
    } else if (isObject(node)) {
      return Object.entries(node).map((entry, idx) => {
        return (
          <li key={`${entry[0]}-idx`}>
            <Leaf
              isLast={idx === Object.entries(node).length - 1}
              node={entry[1]}
              title={entry[0]}
            />
          </li>
        );
      });
    }

    return null;
  };

  return (
    <ul
      className={[
        "leaf-container",
        isOpen ? "opened" : "",
        isParent(node) ? "parent" : "",
      ].join(" ")}
    >
      <OpenBracket
        isLast={isLast}
        title={title}
        value={!isParent(node) ? getFormattedValue(node) : node}
        openBracket={openBracket}
        closeBracket={closeBracket}
        isOpen={isOpen}
        isParent={isParent(node)}
        onLeafToggle={onLeafToggle}
        signSymbol={signSymbol}
      />
      {getContent()}
      <CloseBracket
        isLast={isLast}
        isOpen={isOpen}
        closeBracket={closeBracket}
      />
    </ul>
  );
}

Leaf.defaultProps = {
  isLast: true,
};

Leaf.propTypes = {
  node: PropTypes.any,
  title: PropTypes.string,
  isLast: PropTypes.bool,
};

export default Leaf;

const OpenBracket = ({
  title,
  value,
  openBracket,
  closeBracket,
  isOpen,
  isLast,
  isParent,
  onLeafToggle,
  signSymbol,
}) => {
  return (
    <li className="open-bracket">
      {isParent && (
        <div onClick={onLeafToggle}>
          <b>{signSymbol}</b>
        </div>
      )}
      {!!title && (
        <span className="title">
          {title}
          {isParent && <span>&nbsp;</span>}
        </span>
      )}
      {isParent && <span>{openBracket}</span>}
      {isParent && !isOpen && <b>...</b>}
      {isParent && !isOpen && (
        <span>
          {closeBracket}
          {!isLast ? <span>,</span> : null}
        </span>
      )}
      {!isParent && (
        <span className="scalar-value">
          <b>:&nbsp;</b>
          {value}
          {!isLast ? <span>,</span> : null}
        </span>
      )}
    </li>
  );
};

const CloseBracket = ({ isLast, isOpen, closeBracket }) =>
  isOpen && (
    <li className="close-bracket">
      {closeBracket}
      {!isLast ? <span>,</span> : null}
    </li>
  );
