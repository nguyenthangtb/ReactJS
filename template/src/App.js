import React from 'react';
import TopMenu from './Components/TopMenu/TopMenu'
import Header from './Components/Header/Header'
import Content from './Components/Content/Content'
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <TopMenu />
      <Header />
      <Content tieude="For those about to rock..." image="img/01.jpg" positionLeft="order-lg-2" />
      <Content tieude="We salute you!" image="img/02.jpg" />
      <Content tieude="Let there be rock!" image="img/03.jpg" positionLeft="order-lg-2"  />
      <Footer/>
    </div>
  );
}

export default App;
