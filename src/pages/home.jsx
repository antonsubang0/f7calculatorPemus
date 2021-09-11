import React, { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
  Page,
  Navbar,
  NavTitle,
  PageContent,
  Sheet,
  Link,
  Toolbar,
  Row,
  Col,
  Button,
  Icon,
} from 'framework7-react';

const HomePage = () => {
  const [sheetOpened, setSheetOpened] = useState(false);
  const [fill, setFill] = useState(0);
  const [valueNumPad, setValueNumPad] = useState(0);
  const [valueX, setValueX] = useState({
    perKereta : 0,
    perRak : 0,
    jumlahKereta : 0,
    jumlahRak : 0,
    jumlahButir : 0,
    rakSampling : 0,
    infertile : 0,
    explode : 0,
    dis : 0,
    kurang : 0,
  });
  const [quota, setQuota] = useState(0);
  const [jumlahSample, setJumlahSample] = useState(0);
  const [kekurangan, setKekurangan] = useState(0);
  const [penggantian, setPenggantian] = useState(0);
  const handleObject = (data) => {
    setSheetOpened(true);
    setValueNumPad(0);
    setFill(data);
  }
  const handleNumPad = (data) => {
    setValueNumPad(parseInt(valueNumPad + data));
    if (fill== 1) {
      setValueX({...valueX, perKereta : parseInt(valueNumPad + data)});      
    }
    if (fill== 2) {
      setValueX({...valueX, perRak : parseInt(valueNumPad + data)});      
    }
    if (fill== 3) {
      setValueX({...valueX, jumlahKereta : parseInt(valueNumPad + data)});     
    }
    if (fill== 4) {
      setValueX({...valueX, jumlahRak : parseInt(valueNumPad + data)});     
    }
    if (fill== 5) {
      setValueX({...valueX, jumlahButir : parseInt(valueNumPad + data)});     
    }
    if (fill== 6) {
      setValueX({...valueX, rakSampling : parseInt(valueNumPad + data)});   
    }
    if (fill== 7) {
      setValueX({...valueX, infertile : parseInt(valueNumPad + data)});   
    }
    if (fill== 8) {
      setValueX({...valueX, explode : parseInt(valueNumPad + data)});   
    }
    if (fill== 9) {
      setValueX({...valueX, dis : parseInt(valueNumPad + data)});   
    }
    if (fill== 10) {
      setValueX({...valueX, kurang : parseInt(valueNumPad + data)});   
    }
  }
  const clearCs = () => {
    const tempdata = valueNumPad;
    setValueNumPad(Math.floor(tempdata/10));
    if (fill== 1) {
      setValueX({...valueX, perKereta : parseInt(Math.floor(tempdata/10))});      
    }
    if (fill== 2) {
      setValueX({...valueX, perRak : parseInt(Math.floor(tempdata/10))});      
    }
    if (fill== 3) {
      setValueX({...valueX, jumlahKereta : parseInt(Math.floor(tempdata/10))});     
    }
    if (fill== 4) {
      setValueX({...valueX, jumlahRak : parseInt(Math.floor(tempdata/10))});     
    }
    if (fill== 5) {
      setValueX({...valueX, jumlahButir : parseInt(Math.floor(tempdata/10))});     
    }
    if (fill== 6) {
      setValueX({...valueX, rakSampling : parseInt(Math.floor(tempdata/10))});   
    }
    if (fill== 7) {
      setValueX({...valueX, infertile : parseInt(Math.floor(tempdata/10))});   
    }
    if (fill== 8) {
      setValueX({...valueX, explode : parseInt(Math.floor(tempdata/10))});   
    }
    if (fill== 9) {
      setValueX({...valueX, dis : parseInt(Math.floor(tempdata/10))});   
    }
    if (fill== 10) {
      setValueX({...valueX, kurang : parseInt(Math.floor(tempdata/10))});   
    }
  }
  useEffect(()=>{
    setQuota((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir);
    setJumlahSample(valueX.rakSampling * valueX.perRak);
    setKekurangan((valueX.infertile+valueX.explode+valueX.dis+valueX.kurang)/(valueX.rakSampling * valueX.perRak));
    setPenggantian(((valueX.infertile+valueX.explode+valueX.dis+valueX.kurang)/(valueX.rakSampling * valueX.perRak))*((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir));
  },[valueX, setJumlahSample]);
  useEffect(()=>{
    App.removeAllListeners();
    App.addListener('backButton', (e)=> {
      const { canGoBack } = e;
      if (canGoBack == false) {
        if (sheetOpened) {
          setSheetOpened(false)
        } else {
          App.exitApp()
        }
      }
    })
  },[sheetOpened]);
  useEffect(()=>{
    Device.getInfo().then((res) => {
      if (res.platform == 'android') {
        StatusBar.setStyle({ style: Style.Dark });
        StatusBar.setBackgroundColor({color : '#009688'}); 
      }
    });
  },[])

  return (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar bgColor='teal' sliding={false}>
      <NavTitle color='white'>CalPes</NavTitle>
      <div className='kananNavbar'>@cahMagetan</div>
    </Navbar>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss rowCs'>
        <Col className='text-align-center'>Jumlah Quota</Col>
      </Row>
    
      <Row className='rowCs mcs'>
      <Col className='text-align-center' onClick={()=>{ handleObject(1);}}>
          <div> <span className='fwcs'>Per Kereta :</span> { valueX.perKereta } Rak</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(2);}}>
          <div> <span className='fwcs'>Per Rak :</span> { valueX.perRak } Butir</div>
        </Col>
      </Row>
    
    
      <Row className='rowCs mcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(3);}}>
          <div className='fwcs'>Kereta</div>
          <div>{ valueX.jumlahKereta }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(4);}}>
          <div className='fwcs'>Rak</div>
          <div>{ valueX.jumlahRak }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(5);}}>
          <div className='fwcs'>Butir</div>
          <div>{ valueX.jumlahButir }</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Jumlah</div>
          <div>{ quota }</div>
        </Col>
      </Row>
    </div>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss rowCs'>
        <Col className='text-align-center'>Sampling</Col>
      </Row>
    
    
      <Row className='rowCs mcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(6);}}>
          <div className='fwcs'>Rak</div>
          <div>{valueX.rakSampling}</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>&#x2211; Sample</div>
          <div>{jumlahSample}</div>
        </Col>
      </Row>
    
    
      <Row className='rowCs mcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(7);}}>
          <div className='fwcs'>Infertile</div>
          <div>{ valueX.infertile }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(8);}}>
          <div className='fwcs'>Explode</div>
          <div>{ valueX.explode }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(9);}}>
          <div className='fwcs'>DIS</div>
          <div>{ valueX.dis }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(10);}}>
          <div className='fwcs'>Kurang</div>
          <div>{ valueX.kurang }</div>
        </Col>
      </Row>
      <Row className='rowCs mcs btcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Total</div>
          <div>{valueX.infertile + valueX.explode + valueX.dis + valueX.kurang} ( { isNaN(kekurangan) || jumlahSample == 0 ? '0' : (kekurangan*100).toFixed(2) } %)</div>
        </Col>
      </Row>
    </div>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss'>
        <Col className='text-align-center'>Penggantian : {isNaN(penggantian) || jumlahSample == 0? '0' : Math.round(penggantian)} Btr ( { valueX.perRak == 0 || isNaN(penggantian) || jumlahSample ==0 ? '0' : Math.floor(Math.round(penggantian)/valueX.perRak)} rak, { valueX.perRak == 0 || isNaN(penggantian) || jumlahSample==0? '0' : Math.round(penggantian) - (Math.floor(Math.round(penggantian)/valueX.perRak)*valueX.perRak) } btr )</Col>
      </Row>
    </div>
    
    <Sheet
      className="demo-sheet"
      opened={sheetOpened}
      onSheetClosed={() => {
        setSheetOpened(false);
      }}
      closeByBackdropClick={false}
    >
      <Toolbar>
        <div className="left ValueNumPadcss"> { valueNumPad == '0' ? '0' : valueNumPad } </div>
        <div className="right">
          <Link sheetClose>Close</Link>
        </div>
      </Toolbar>
      {/*  Scrollable sheet content */}
      <PageContent>
        
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('1')}}><Button fill bgColor='teal'>1</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('2')}}><Button fill bgColor='teal'>2</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('3')}}><Button fill bgColor='teal'>3</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('4')}}><Button fill bgColor='teal'>4</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('5')}}><Button fill bgColor='teal'>5</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('6')}}><Button fill bgColor='teal'>6</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('7')}}><Button fill bgColor='teal'>7</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('8')}}><Button fill bgColor='teal'>8</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('9')}}><Button fill bgColor='teal'>9</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('0')}}><Button fill bgColor='teal'>0</Button></Col>
            <Col className='text-align-center' onClick={clearCs}><Button fill bgColor='teal'><Icon material="backspace"></Icon></Button></Col>
            <Col className='text-align-center' onClick={()=>{ setSheetOpened(false)} } ><Button fill bgColor='teal'><Icon material="check"></Icon></Button></Col>
          </Row>
        
      </PageContent>
    </Sheet>
  </Page>

)};
export default HomePage;