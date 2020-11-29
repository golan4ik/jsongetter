import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Leaf from "../Leaf/Leaf";

function JsonGetter(props) {
  const { url, onLoadStatusChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (url) {
      onLoadStatusChange(true);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, setData]);

  useEffect(() => {
    if (isLoading) {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => mounted.current && setData(data))
        .catch((error) => mounted.current && setData(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    onLoadStatusChange(false);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const showData = !isLoading && data;

  return (
    <div className="data-container">
      {showData ? (
        <div className="data-content">
          <Leaf node={data} />
        </div>
      ) : (
        !isLoading && <div className="empty-data">No data to show</div>
      )}
      {isLoading && <div>Loading data...</div>}
    </div>
  );
}

JsonGetter.propTypes = {
  url: PropTypes.string,
  onLoadStatusChange: PropTypes.func,
};

export default JsonGetter;
