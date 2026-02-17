import { useEffect, useMemo, useState } from "react";
import {
  SystemBar as Bar,
  SystemIdentity,
  SystemTitle,
  SystemRight,
  SystemPill,
} from "@primitives";

const formatTime = (d) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const TopSystemBar = ({
  name = "Adam Boyd",
  subtitle = "Frontend / React",
  activeTitle = "Desktop",
}) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 10); // update every 10s
    return () => clearInterval(id);
  }, []);

  const timeText = useMemo(() => formatTime(now), [now]);

  return (
    <Bar>
      {/* LEFT */}
      <SystemIdentity>
        <span>{name}</span>
        <SystemTitle>{subtitle}</SystemTitle>
      </SystemIdentity>

      {/* CENTER */}
      <SystemTitle title="Active window">
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 320 }}>
          {activeTitle || "Desktop"}
        </span>
      </SystemTitle>

      {/* RIGHT */}
      <SystemRight>
        <SystemPill title="Time">{timeText}</SystemPill>
      </SystemRight>
    </Bar>
  );
};

export default TopSystemBar;
