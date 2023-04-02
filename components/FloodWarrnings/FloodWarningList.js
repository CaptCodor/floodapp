import FloodWarning from "./FloodWarning";

import classes from "./FloodWarningList.module.css";

const FloodWarningList = (props) => {
  return (
    <>
      {props.floodWarnings.length === 0 &&
        <p className={classes.nofloodmessage}>There are no floods that match this criteria.</p>
      }
      {props.floodWarnings.length > 0 &&
        props.floodWarnings.map((floodWarning) => (
          <FloodWarning
            key={floodWarning.key}
            floodWarning={floodWarning}
          />
        ))}    
    </>
  );
};

export default FloodWarningList;
