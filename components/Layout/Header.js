import { useEffect } from 'react';
import Sliders from '../UI/Sliders';

import classes from './Header.module.css';

const uniqueAreas = [];
 
// **** create a unique list of all the area/county names that appear in the data
 const addToUniqueAreaList = (areaNames) => {
// split into seperate names
   const names =  areaNames.split(', '); 

   names.forEach(name => {
// add the names if they are unique
     if (uniqueAreas.indexOf(name.trim()) === -1) {
       uniqueAreas.push(name.trim());
     }      
   });
 };

const Header = (props) => {

  useEffect(() => {
// create a unique list of area names  
    props.floodWarnings.forEach(fw => {
      addToUniqueAreaList(fw.eaAreaName);
    });

// add a unique county names  
    props.floodWarnings.forEach(fw => {
      addToUniqueAreaList(fw.county);
    });
  }, [props.floodWarnings]);

  
  return (
    <>      
      <header className={classes.header}>
        <h1>Environment Agency Flood Warnings</h1>
        <label htmlFor="areaFilter" className={classes.selectAreaLabel}>Select Area that you are interested in </label>
        <select className={classes.selectAreaDropdown} onChange={props.setFilteredArea} id="areaFilter" name="areaFilter">
          <option value="All">All</option>
            {uniqueAreas.sort((a, b) => a > b ? 1 : -1).map((area) => (
              <option key={area} value={area}>{area}</option>                
            ))}
        </select>
        <Sliders min={props.min} max={props.max} setMinSeverityLevels={props.setMinSeverityLevels} setMaxSeverityLevels={props.setMaxSeverityLevels} showInfo={props.showInfo} />
        <button className={classes.refresh} onClick={props.Refresh}>Refresh</button>
      </header>
    </>
  )
}

export default Header;