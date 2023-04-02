import classes from './Sliders.module.css'

const Sliders = (props) => {
  return (
    <div>    
        <span className={classes.title}>Lowest Warning</span><span className={classes.title}>Highest Warning</span><br/>
        <input
          min={1}
          max={4}
          value={ 5 - props.max}
          type="range"
          className={classes.slider}
          onChange={(e) => e.target.valueAsNumber <= ( 5 - props.min ) ? props.setMaxSeverityLevels(5 - e.target.valueAsNumber) : e.preventDefault}          
        />        
        <input          
          min={1}
          max={4}
          value={ 5 - props.min}
          type="range"
          className={classes.slider}
          onChange={(e) => e.target.valueAsNumber >= (5 - props.max ) ? props.setMinSeverityLevels(5 - e.target.valueAsNumber) : e.preventDefault}
        />
        <button className={classes.info} onClick={props.showInfo}>i</button>
      </div>
  );
}

export default Sliders;