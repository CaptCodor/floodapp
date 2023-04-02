import { useCallback, useState, useEffect } from 'react';
import InfoCard from './components/InfoCard/InfoCard';
import FloodWarningList from './components/FloodWarrnings/FloodWarningList';
import Header from './components/Layout/Header';

function App() {  
  const [floodWarnings, setFloodWarnings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setError] = useState(null);
  const [filteredArea, setFilteredArea] = useState("All");
  const [showSeverityLevels, setShowSeverityLevels] = useState({min: 1 , max: 4});  
  const [showInfo, setShowInfo] = useState(false);

  const fetchFloodWarningsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://environment.data.gov.uk/flood-monitoring/id/floods');
      if (!response.ok) {
        throw new Error('Connection to the Flood Warning System failed.');
      }

      const data = await response.json();

      const loadedFloodWarnings = [];

      for (const index in data.items) {
        loadedFloodWarnings.push({
          id: data.items[index].id,
          key: index,
          description: data.items[index].description,
          eaAreaName: data.items[index].eaAreaName,
          county: data.items[index].floodArea.county,
          riverOrSea: data.items[index].floodArea.riverOrSea,
          message: data.items[index].message,
          severity: data.items[index].severity,
          severityLevel: data.items[index].severityLevel,
          timeMessageChanged: data.items[index].timeMessageChanged,
        })
      }
      
      setFloodWarnings(loadedFloodWarnings);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFloodWarningsHandler();
  }, [fetchFloodWarningsHandler]);

  const SeverityMinLevelHandler = (min) => {
    setShowSeverityLevels({...showSeverityLevels, min});
  };

  const SeverityMaxLevelHandler = (max) => {
    setShowSeverityLevels({...showSeverityLevels, max});
  };

  const FilterAreaHandler = (area) => {
    setFilteredArea(area.target.value);
  };

  const ShowInfoHandler = () => {
    setShowInfo(true);
  }

  const HideInfoHandler = () => {
    setShowInfo(false);    
  }

  let mainContent = <p>Found no flood warning.</p>;
  
  if (floodWarnings.length > 0) {    
    if (filteredArea === "All") {
      mainContent = <FloodWarningList floodWarnings={floodWarnings.filter(fw=> (fw.severityLevel >= showSeverityLevels.min) && (fw.severityLevel <= showSeverityLevels.max)).sort((a, b) => a.severityLevel > b.severityLevel ? 1 : -1)} />;
    } else {
      mainContent = <FloodWarningList floodWarnings={floodWarnings.filter(fw=> ((fw.eaAreaName.indexOf(filteredArea) !== -1) || (fw.county.indexOf(filteredArea) !== -1)) && (fw.severityLevel >= showSeverityLevels.min) && (fw.severityLevel <= showSeverityLevels.max)).sort((a, b) => a.severityLevel > b.severityLevel ? 1 : -1)} />;
    }
  }

  if (errorMessage) {
    mainContent = <p>{errorMessage}</p>;
  }

  if (isLoading) {
    mainContent = <p>Loading...</p>;
  }
  
  return (
    <div className="App">
      <Header floodWarnings={floodWarnings} setFilteredArea={FilterAreaHandler} min={showSeverityLevels.min} max={showSeverityLevels.max} setMinSeverityLevels={SeverityMinLevelHandler} setMaxSeverityLevels={SeverityMaxLevelHandler} Refresh={fetchFloodWarningsHandler} showInfo={ShowInfoHandler} />      
      { showInfo && <InfoCard hideInfo={HideInfoHandler} />}
      <main className='main'>{mainContent}</main>    
    </div>
  );
}
export default App;
