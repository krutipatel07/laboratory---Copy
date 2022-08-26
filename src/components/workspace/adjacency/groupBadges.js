import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Badge from "./Badge.js";

export default function GroupBadges(props) {
  return (
    <AvatarGroup max={30}>
      {props.rooms.map((room) => (
        <Badge name={room[0]} type={room[1]} />
      ))}
    </AvatarGroup>
  );
}
