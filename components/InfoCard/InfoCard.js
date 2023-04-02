import Card from '../UI/Card';
import classes from './InfoCard.module.css';

const InfoCard = (props) => {
  //  https://www.w3schools.com/howto/howto_css_modals.asp

  return (
    <Card className={classes.information}>
      <span className={classes.close} onClick={props.hideInfo}>&times;</span>
      <div className={classes.details}>
        <h1>Key for Warnings</h1>
        <ol>
          <span className={classes.colourBox + " " + classes.L1}></span><li>Severe Flood Warning	Severe Flooding, Danger to Life.</li>
          <span className={classes.colourBox + " " + classes.L2} /><li>Flood Warning	Flooding is Expected, Immediate Action Required.</li>
          <span className={classes.colourBox + " " + classes.L3} /><li>Flood Alert	Flooding is Possible, Be Prepared.</li>
          <span className={classes.colourBox + " " + classes.L4} /><li>Warning no Longer in Force	The warning is no longer in force</li>
        </ol>
        <span className={classes.sliderNote}>Use sliders to set minimum and maximum levels you want to view.</span>
      </div>
    </Card>
  )
};

export default InfoCard;