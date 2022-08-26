import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import WeekendIcon from "@mui/icons-material/Weekend";
import KitchenIcon from "@mui/icons-material/Kitchen";

export default function Badge(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  switch (props.type) {
    case "bedroom":
      return (
        <div sx={{ margin: 0, padding: 0 }}>
          <Avatar
            sx={{ bgcolor: "#C0D8C2" }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <BedIcon sx={{ color: "#000000" }} />
          </Avatar>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{props.name}</Typography>
          </Popover>
        </div>
      );
    case "bathroom":
      return (
        <div sx={{ margin: 0, padding: 0 }}>
          <Avatar
            sx={{ bgcolor: "#ACD4EA" }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <BathtubIcon sx={{ color: "#000000" }} />
          </Avatar>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{props.name}</Typography>
          </Popover>
        </div>
      );
    case "kitchen":
      return (
        <div sx={{ margin: 0, padding: 0 }}>
          <Avatar
            sx={{ bgcolor: "#F0DFF3" }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <KitchenIcon sx={{ color: "#000000" }} />
          </Avatar>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{props.name}</Typography>
          </Popover>
        </div>
      );
    case "dining":
      return (
        <div sx={{ margin: 0, padding: 0 }}>
          <Avatar
            sx={{ bgcolor: "#F2C1C1" }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <LocalDiningIcon sx={{ color: "#000000" }} />
          </Avatar>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{props.name}</Typography>
          </Popover>
        </div>
      );
    case "living":
      return (
        <div sx={{ margin: 0, padding: 0 }}>
          <Avatar
            sx={{ bgcolor: "#FAD3B3" }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <WeekendIcon sx={{ color: "#000000" }} />
          </Avatar>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{props.name}</Typography>
          </Popover>
        </div>
      );
    case "garage":
      return (
        <div sx={{ margin: 0, padding: 0 }}>
          <Avatar
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <DirectionsCarIcon sx={{ color: "#000000" }} />
          </Avatar>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{props.name}</Typography>
          </Popover>
        </div>
      );
    default:
      return null;
  }
}
