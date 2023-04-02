import SimpleDateTime  from 'react-simple-timestamp-to-date';
import classes from "./FloodWarning.module.css";
import Card from "../UI/Card";
import { useState } from "react";

const FloodWarning = (props) => {
  const [showMessage, setShowMessage] = useState(false);

  const ShowMessageHandler = () => {
    setShowMessage((prevState) => !prevState);
  };

  let levelClass;

  switch (props.floodWarning.severityLevel) {
    case 1:
      levelClass = classes.L1;
      break;
    case 2:
      levelClass = classes.L2;
      break;
    case 3:
      levelClass = classes.L3;
      break;
    default:
      levelClass = classes.L4;
  }

  return (
      <Card className={classes.floodwarning + " " + levelClass}>
        <div className={classes.area}>{props.floodWarning.eaAreaName}</div>
        <div className={classes.county}>{props.floodWarning.county}</div>
        <div className={classes.description}>
          {props.floodWarning.description}
        </div>
        <div className={classes.riverOrSea}>
          {props.floodWarning.riverOrSea}
          <br />
        </div>
        {props.floodWarning.message.length > 1 ? (
          <span className={classes.expandtooltip}>
            <button className={classes.expandButton} onClick={ShowMessageHandler}>
              {showMessage ? "-" : "+"}
            </button>
              <span className={classes.tooltiptext}>{showMessage ? "Hide" : "Display"} additional information</span>
          </span>                      
        ) : (
          <br />
        )}
        {showMessage && (
          <>
            <div className={classes.message}>{props.floodWarning.message}</div>
            <br />
          </>
        )}
        <div>
          <span className={classes.severityLevel}>
            Severity: {props.floodWarning.severityLevel} (
            {props.floodWarning.severity})
          </span>{" "}
          as of{" "}
          <span className={classes.timeMessageChanged}>
            <SimpleDateTime timeSeparator=":" showDate="false">{props.floodWarning.timeMessageChanged}</SimpleDateTime>
            <SimpleDateTime dateFormat="DMY" dateSeparator="/" showTime="false">{props.floodWarning.timeMessageChanged}</SimpleDateTime>
          </span>
        </div>
      </Card>
  );
};

export default FloodWarning;
