import React from "react";

// Antd
import { Tag, Tooltip } from "antd";

// ------ FUNCTIONS ------
import { stringToColour } from "../../../utils/functions";

// ------ CONSTANTS ------
import { SIZE_LIM_TAG } from "../../../utils/constants";

const ListTags = (props) => {
  const { tags = [] } = props;

  return (
    <>
      {tags.map((tag) => {
        const isLongTag = tag.length > SIZE_LIM_TAG;

        const tagElem = (
          <Tag color={stringToColour(tag)}>
            {isLongTag ? `${tag.slice(0, SIZE_LIM_TAG)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
    </>
  );
};

export default ListTags;
