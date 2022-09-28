import * as React from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Badge from "./badge";

export default function GroupBadges(props) {
  return (
    <AvatarGroup max={30}>
      {props.rooms.map(({key, room}) => (
        <Badge key={key} name={room[0]} type={room[1]} />
      ))}
    </AvatarGroup>
  );
}
