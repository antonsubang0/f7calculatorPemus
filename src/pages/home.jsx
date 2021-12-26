import React, { useEffect, useState, } from 'react';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
  Page,
  Navbar,
  NavLeft,
  Link,
  NavTitle,
  PageContent,
  Sheet, Toolbar,
  Row,
  Col,
  Button,
  Icon,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
} from 'framework7-react';
import CalculatorsW from '../components/calculator';
import { pdf1 } from '../pdf';

const HomePage = ({f7router}) => {
  const [loginScreenOpened, setloginScreenOpened] = useState(false);
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
    lebih : 0
  });
  const [osVs, setOsVs] = useState(1);
  const [quota, setQuota] = useState(0);
  const [jumlahSample, setJumlahSample] = useState(0);
  const [kekurangan, setKekurangan] = useState(0);
  const [penggantian, setPenggantian] = useState(0);
  const handleObject = (data, value) => {
    setSheetOpened(true);
    setValueNumPad(value);
    setFill(data);
  }
  const [JudulPdf, setJudulPdf] = useState('');
  const handleNumPad = (data) => {
    if (parseInt(valueNumPad + data) > 10000) {
      return;
    }
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
    if (fill== 11) {
      setValueX({...valueX, lebih : parseInt(valueNumPad + data)});   
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
    if (fill== 11) {
      setValueX({...valueX, lebih : parseInt(Math.floor(tempdata/10))});   
    }
  }
  useEffect(()=>{
    setQuota((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir);
    setJumlahSample(valueX.rakSampling * valueX.perRak);
    setKekurangan(valueX.kurang-valueX.lebih > 0 ? (valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-valueX.lebih)/(valueX.rakSampling * valueX.perRak) : (valueX.infertile+valueX.explode+valueX.dis)/(valueX.rakSampling * valueX.perRak));
    setPenggantian(valueX.kurang-valueX.lebih > 0 ? ((valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-valueX.lebih)/(valueX.rakSampling * valueX.perRak))*((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) : ((valueX.infertile+valueX.explode+valueX.dis)/(valueX.rakSampling * valueX.perRak))*((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir));
  },[valueX, setJumlahSample]);
  useEffect(()=>{
    Device.getInfo().then((res) => {
      if (res.platform == 'android') {
        if (res.osVersion > 5.5) {
          StatusBar.setStyle({ style: Style.Dark });
          StatusBar.setBackgroundColor({color : '#009688'});  
        }
        setOsVs(res.osVersion);
      }
    });
  },[]);
  // caculator
  const [calculator, setCalculator] = useState(false);
  const openCalculator = () => {
    setCalculator(!calculator);
    if (calculator) {
      const aa = document.querySelector('.display');
      const bb = document.querySelector('.contentz');
      bb.style.bottom = 0 + 'px'; 
      console.log(bb.clientHeight);
      let now = 0;
      let selisih = 0;
      let position = 0;
      aa.addEventListener('touchmove', (e) =>{
        if (now==0) {
          now = e.changedTouches[0].clientY; 
        } else {
          selisih = e.changedTouches[0].clientY - now;
          if ( selisih > 0) {
            position = position - selisih/50;
            if (position < 0 ) {
              if (position > -240) {
                bb.style.bottom = position + 'px';  
              } 
            }
          }
        }
      });
    }
  };
  const closeCalculation = () => { setCalculator(false)};
  useEffect(()=>{
    App.removeAllListeners();
    App.addListener('backButton', (e)=> {
      const { canGoBack } = e;
      if (canGoBack == false) {
        if (sheetOpened) {
          setSheetOpened(false);
        } else if (calculator) {
          setCalculator(false);
        } else if (loginScreenOpened) {
          setloginScreenOpened(false);
        } else {
          App.exitApp();
        }
      } else {
        if (sheetOpened) {
          setSheetOpened(false);
        } else if (calculator) {
          setCalculator(false);
        } else if (loginScreenOpened) {
          setloginScreenOpened(false);
        } else {
          App.exitApp();
        }
      }
    })
  },[sheetOpened, calculator]);

  return (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar bgColor='teal' sliding={false}>
      <NavLeft>
        <Link panelOpen="left">
          <Icon f7="icon-bars" color="white"></Icon>
        </Link>
      </NavLeft>
      <NavTitle color='white'>CalPes 1</NavTitle>
      <div className='kananNavbar' onClick={openCalculator}>@cahMagetan {osVs}</div>
    </Navbar>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss rowCs'>
        <Col className='text-align-center'>Jumlah Quota</Col>
      </Row>
    
      <Row className='rowCs mcs'>
      <Col className='text-align-center' onClick={()=>{ handleObject(1, valueX.perKereta);}}>
          <div className='fwcs'>Per Kereta :</div>
          <div className='boxCs'> { valueX.perKereta } Rak</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(2, valueX.perRak);}}>
          <div className='fwcs'>Per Rak :</div>
          <div className='boxCs'> { valueX.perRak } Butir</div>
        </Col>
      </Row>
    
    
      <Row className='rowCs mcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(3, valueX.jumlahKereta);}}>
          <div className='fwcs'>Kereta</div>
          <div className='boxCs'>{ valueX.jumlahKereta }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(4, valueX.jumlahRak);}}>
          <div className='fwcs'>Rak</div>
          <div className='boxCs'>{ valueX.jumlahRak }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(5, valueX.jumlahButir);}}>
          <div className='fwcs'>Butir</div>
          <div className='boxCs'>{ valueX.jumlahButir }</div>
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
        <Col className='text-align-center' onClick={()=>{ handleObject(6, valueX.rakSampling);}}>
          <div className='fwcs'>Rak</div>
          <div className='boxCs'>{valueX.rakSampling}</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>&#x2211; Sample</div>
          <div>{jumlahSample}</div>
        </Col>
      </Row>
    
    
      <Row className='rowCs mcs btcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(7, valueX.infertile);}}>
          <div className='fwcs'>Infertile</div>
          <div className='boxCs'>{ valueX.infertile }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(8, valueX.explode);}}>
          <div className='fwcs'>Explode</div>
          <div className='boxCs'>{ valueX.explode }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(9, valueX.dis);}}>
          <div className='fwcs'>DIS</div>
          <div className='boxCs'>{ valueX.dis }</div>
        </Col>
      </Row>
      <Row className='rowCs mcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(10, valueX.kurang);}}>
          <div className='fwcs'>Kurang</div>
          <div className='boxCs'>{ valueX.kurang }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(11, valueX.lebih);}}>
          <div className='fwcs'>Lebih</div>
          <div className='boxCs'>{ valueX.lebih }</div>
        </Col>
      </Row>
      <Row className='rowCs mcs btcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Total</div>
          <div>{ valueX.infertile + valueX.explode + valueX.dis + valueX.kurang-valueX.lebih } ( { isNaN(kekurangan) || jumlahSample == 0 ? '0' : ((valueX.infertile + valueX.explode + valueX.dis + valueX.kurang-valueX.lebih)/jumlahSample*100).toFixed(2) } %)</div>
        </Col>
      </Row>
    </div>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss rowCs'>
        <Col className='text-align-center'>Penggantian : { valueX.kurang-valueX.lebih > 0 ? valueX.infertile + valueX.explode + valueX.dis + valueX.kurang-valueX.lebih : valueX.infertile + valueX.explode + valueX.dis } ( { isNaN(kekurangan) || jumlahSample == 0 ? '0' : (kekurangan*100).toFixed(2) } %)</Col>
      </Row>
      <Row className='rowCs mcs'>
        <Col className='text-align-center'>
          <div className='fwcs'>&#x2211; Penggantian : {isNaN(penggantian) || penggantian < 0 || jumlahSample == 0? '0' : Math.round(penggantian)} Btr ( { valueX.perRak == 0 || isNaN(penggantian) || penggantian < 0 || jumlahSample ==0 ? '0' : Math.floor(Math.round(penggantian)/valueX.perRak)} rak, { valueX.perRak == 0 || isNaN(penggantian) || penggantian < 0 || jumlahSample==0 ? '0' : Math.round(penggantian) - (Math.floor(Math.round(penggantian)/valueX.perRak)*valueX.perRak) } btr )</div>
          <div className='fwcs'>Quota (tidak mengganti) : {isNaN(penggantian) || penggantian < 0 || jumlahSample == 0? (valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir : ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) - Math.round(penggantian)} Btr</div>
        </Col>
      </Row>
    </div>

    <div className='moreCs'>
      <Button onClick={() => setloginScreenOpened(true)} bgColor='blue' color='white'>Buat PDF</Button>
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
        <div className="left ValueNumPadcss">
          { valueNumPad == '0' ? '0' : valueNumPad }
        </div>
      </Toolbar>
      {/*  Scrollable sheet content */}
      <PageContent className='modalBodyNumpad'>
        
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('1')}}><Button className='pyNumPad' fill bgColor='teal'>1</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('2')}}><Button className='pyNumPad' fill bgColor='teal'>2</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('3')}}><Button className='pyNumPad' fill bgColor='teal'>3</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('4')}}><Button className='pyNumPad' fill bgColor='teal'>4</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('5')}}><Button className='pyNumPad' fill bgColor='teal'>5</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('6')}}><Button className='pyNumPad' fill bgColor='teal'>6</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('7')}}><Button className='pyNumPad' fill bgColor='teal'>7</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('8')}}><Button className='pyNumPad' fill bgColor='teal'>8</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('9')}}><Button className='pyNumPad' fill bgColor='teal'>9</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={clearCs}><Button className='pyNumPad' fill bgColor='teal'><Icon material="backspace"></Icon></Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleNumPad('0')}}><Button className='pyNumPad' fill bgColor='teal'>0</Button></Col>
            <Col className='text-align-center' onClick={()=>{ setSheetOpened(false)} } ><Button className='pyNumPad' fill bgColor='teal'><Icon material="check"></Icon></Button></Col>
          </Row> 
      </PageContent>
    </Sheet>
    <CalculatorsW calculator={calculator} closeCalculation={closeCalculation} />
    <LoginScreen
      className="demo-login-screen"
      opened={loginScreenOpened}
    >
      <Page loginScreen>
        <LoginScreenTitle>Buat PDF</LoginScreenTitle>
        <div className='moreCs'>
        <List noHairlinesMd>
          <ListInput
            onChange={e=> setJudulPdf(e.target.value)}
            type="text"
            placeholder="Perusahaan ex: 'PT. CahMagetan'"
            clearButton
          />
        </List>
        <Button onClick={() => {pdf1(JudulPdf, valueX, quota, jumlahSample, penggantian); setloginScreenOpened(false);}} bgColor='blue' color='white'>Simpan Pdf</Button>
        <div className='undclose' onClick={() => { setloginScreenOpened(false);}}>Close</div>
        </div>
      </Page>
    </LoginScreen>
  </Page>
)};
export default HomePage;