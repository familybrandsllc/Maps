body {
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.map-section {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.gm-style .gm-style-iw-d::-webkit-scrollbar-track, 
.gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece,
.gm-style .gm-style-iw-c,
.gm-style .gm-style-iw-t::after { 
  background: #231F20;
  color: #ffffff;
}

.list-holder {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 20%;
  height: 100%;
  max-width: 350px;
  min-width: 250px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: solid;
  border-width: 3px;
  border-color: #721414;
}


.map-window {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

#map {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 3px;
  border-color: #721414;
}

.title {
  margin-top: 15px;
  margin-bottom: 15px;
  color: #9c1a1a;
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  text-align: center;
}

.search-holder {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.search-container {
  border-radius: 30px;
  position: relative;
  z-index: 100;
  top: 0px;
  width: 98%;
  height: 40px;
  background-color: #454E53;
  display: flex;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.507);
}

.search-container .search {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

.search-container input {
  width: 100%;
  font-size: 18px;
  background-color: transparent;
  border: none;
  color: white;
}

.search-container input:focus {
  outline: none;
}

.search i {
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.stores-list-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 98%;
  height: 100%;
  margin-top: 5px;
  padding-bottom: 15px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.store-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 86%;
  max-width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 15px 10px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-radius: 20px;
  background-color: #ebe4d3;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
  -webkit-transition: background-color 275ms ease;
  transition: background-color 275ms ease;
  cursor: pointer;
  text-decoration: none;
}

.store-container:hover {
  background-color: #e2e2e2;
}

.store-phone-number {
  color: #B5ADAD;
  margin-top: 15px;
  margin-bottom: 15px;
}

.store-number {
  width: 30px;
  height: 30px;
  background-color: #454E53;
  color: #B5ADAD;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.store-info-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding-left: 10px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.store-number-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gm-ui-hover-effect {
    opacity: 1;
    filter: invert(1);
}
.store-info-window {
  min-width: 140px;
  font-size: 12px;
  padding: 8px;
  
}

.store-info-status {
  margin-top: 6px;
  border-bottom: 1px solid #00000029;
  padding-bottom: 6px;
}

.store-info-address,
.store-info-phone {
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.circle {
  background-color: #D71920;
  width: 34px;
  height: 34px;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-decoration: none;
  -webkit-transition: background-color 200ms ease;
  transition: background-color 200ms ease;
}

.circle:hover {
  background-color: #AF0C19;
}

.circle:link {
  color: white;
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
}

::-webkit-scrollbar-thumb {
  background: #454E53;
  border-radius: 30px;
  height: 30px;
}

.button-2 {
  position: absolute;
  z-index: 100;
  left: auto;
  top: 70px;
  right: 10px;
  bottom: auto;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #438fd3;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.5);
  -webkit-transition: background-color 250ms ease;
  transition: background-color 250ms ease;
  color: #fff;
  text-decoration: none;
}

.button-2:active {
  background-color: #799cbb;
}

.button-3 {
  position: absolute;
  z-index: 100;
  left: auto;
  top: 100px;
  right: 10px;
  bottom: auto;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #438fd3;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.5);
  -webkit-transition: background-color 250ms ease;
  transition: background-color 250ms ease;
  color: #fff;
  text-decoration: none;
}

.new-search-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 98%;
  height: 44px;
  padding: 0px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 20px;
  background-color: #721414;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.5);
  -webkit-transition: background-color 250ms ease;
  transition: background-color 250ms ease;
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  text-decoration: none;
}

.new-search-button:hover {
  background-color: #a83a3a;
}


.new-search-container {
  position: relative;
  left: auto;
  bottom: auto;
  z-index: 200;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  margin-bottom: 15px;
  width: 100%;
  height: 80px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
}

.shrink {
  height: 0px;
}

.loader {
  z-index: 1000;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #721414; /* Red */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

.loading-div {
  backdrop-filter: blur(5px);
  position: absolute;
  border-radius: 30px;
  z-index: 20000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 280px;
  height: 80px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(114, 20, 20, 0.7);
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.507);
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
}

.hide{
  height: 0;
  box-shadow: none;
}

.loading-heading {
  color: #fff;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media screen and (max-width: 767px) {
  
  .map-section {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .map-window {
    position: relative;
    margin-top: 15px;
  }

 .list-holder {
    width: 100%;
    height: auto;
    max-width: none;
    min-width: auto;
    border-bottom-width: 0px;
  }

  .stores-list-container {
    display: none;
  }
  
}
