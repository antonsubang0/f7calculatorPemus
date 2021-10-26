import React, { useEffect, useState, useRef } from 'react';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
  Page,
  Navbar,
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
  ListInput
} from 'framework7-react';
import CalculatorsW from '../components/calculator';
import { pdf } from '../pdf';

const Adv = ({f7router}) => {
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
  const [osVs, setOsVs] = useState(1);
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
    if (fill== 11) {
      setForm(Form.map((dataForm, index)=>{
        if (DataParam.no !== index) {
          return dataForm;
        }
        if (DataParam.param===1) {
          return {
            ...dataForm,
            rakBtr : parseInt(valueNumPad + data)
          }  
        }
        if (DataParam.param===2) {
          return {
            ...dataForm,
            rakInf : parseInt(valueNumPad + data)
          }  
        }
        if (DataParam.param===3) {
          return {
            ...dataForm,
            rakExp : parseInt(valueNumPad + data)
          }  
        }
        if (DataParam.param===4) {
          return {
            ...dataForm,
            rakDis : parseInt(valueNumPad + data)
          }  
        }
      })); 
    }
  }
  const [Form, setForm] = useState([]);
  const [DataParam, setDataParam] = useState({
    no : 0,
    param : 0,
  });
  const dataperRak = {
    rakBtr : 0,
    rakInf : 0,
    rakExp : 0,
    rakDis : 0,
  };
  const addDataRak = () => {
    setForm(prex=> [...prex, dataperRak])
  }
  const removeRakkk = () => {
    setForm(prex => prex.splice(0,prex.length-1));
  }
  // index-arraynumber, param-manaYangdiisi
  const eachRak = (index, param) =>{
    setSheetOpened(true);
    setValueNumPad(0);
    setFill(11);
    setDataParam({no : index, param : param});
  }
  const [loginScreenOpened, setloginScreenOpened] = useState(false);
  const [JudulPdf, setJudulPdf] = useState('');
  useEffect(()=>{
    setQuota((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir);
    setJumlahSample(valueX.rakSampling);
    setKekurangan((valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-(valueX.rakSampling-(valueX.perRak*Form.length)))/(valueX.perRak*Form.length));
    setPenggantian((valueX.rakSampling-(valueX.perRak*Form.length)) > 0 ?
    (valueX.infertile+valueX.explode+valueX.dis+valueX.kurang)/(valueX.perRak*Form.length)*((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) : 
    (valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-(valueX.rakSampling-(valueX.perRak*Form.length)))/(valueX.perRak*Form.length)*((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir));
  },[valueX]);
  useEffect(()=>{
    let rakSampel = 0, rakInf =0, rakExp = 0, rakDis = 0, rakKL = 0; 
    Form.map((data)=>{
      rakSampel = rakSampel + data.rakBtr;
      rakInf = rakInf + data.rakInf;
      rakExp = rakExp + data.rakExp;
      rakDis = rakDis + data.rakDis;
    });
    setValueX({...valueX, 
      rakSampling : rakSampel,
      infertile : rakInf,
      explode : rakExp,
      dis : rakDis,
    });
  },[Form]);
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
          App.exitApp()
        }
      } else {
        if (sheetOpened) {
          setSheetOpened(false);
        } else if (calculator) {
          setCalculator(false);
        } else if (loginScreenOpened) {
          setloginScreenOpened(false);
        } else {
          f7router.back()
        }
      }
    })
  },[sheetOpened, calculator]);

  return (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar bgColor='teal' sliding={false}>
      <NavTitle color='white'>CalPes1</NavTitle>
      <div className='kananNavbar' onClick={openCalculator}>@cahMagetan {osVs}</div>
    </Navbar>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss rowCs'>
        <Col className='text-align-center'>Jumlah Quota</Col>
      </Row>
    
      <Row className='rowCs mcs'>
      <Col className='text-align-center' onClick={()=>{ handleObject(1);}}>
          <div className='fwcs'>Per Kereta :</div>
          <div className='boxCs'> { valueX.perKereta } Rak</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(2);}}>
          <div className='fwcs'>Per Rak :</div>
          <div className='boxCs'> { valueX.perRak } Butir</div>
        </Col>
      </Row>
    
    
      <Row className='rowCs mcs'>
        <Col className='text-align-center' onClick={()=>{ handleObject(3);}}>
          <div className='fwcs'>Kereta</div>
          <div className='boxCs'>{ valueX.jumlahKereta }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(4);}}>
          <div className='fwcs'>Rak</div>
          <div className='boxCs'>{ valueX.jumlahRak }</div>
        </Col>
        <Col className='text-align-center' onClick={()=>{ handleObject(5);}}>
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
        <Col className='text-align-center'>
          <div className='fwcs'>Rak</div>
          <div>{Form.length}</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>&#x2211; Sample</div>
          <div>{Form.length * valueX.perRak}</div>
        </Col>
      </Row>
      <Row className='rowCs btcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>No.</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Btr</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Inf</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Exp</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Dis</div>
        </Col>
      </Row>
      {/* baru */}
      {Form.map((data, index)=>{
        return(
          <Row className='rowCs1 mcs' key={index}>
            <Col className='text-align-center'>
              <div>{index + 1}</div>
            </Col>
            <Col className='text-align-center' onClick={()=>{ eachRak(index, 1);}}>
              <div className='boxCs1'>{data.rakBtr}</div>
            </Col>
            <Col className='text-align-center' onClick={()=>{ eachRak(index, 2);}}>
              <div className='boxCs2'>{data.rakInf}</div>
            </Col>
            <Col className='text-align-center' onClick={()=>{ eachRak(index, 3);}}>
              <div className='boxCs2'>{data.rakExp}</div>
            </Col>
            <Col className='text-align-center' onClick={()=>{ eachRak(index, 4);}}>
              <div className='boxCs2'>{data.rakDis}</div>
            </Col>
          </Row>  
        )
      })}
      <Row className='rowCs mcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Total</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>{jumlahSample}</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>{valueX.infertile}</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>{valueX.explode}</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>{valueX.dis}</div>
        </Col>
      </Row>
      <Row className='pd-2 mb-2'>
        <Col>
          <Button bgColor='blue' color='white' onClick={addDataRak}>Tambah Rak</Button>
        </Col>
        <Col>
          <Button bgColor='red' color='white' onClick={removeRakkk}>Hapus Rak</Button>
        </Col>
      </Row>
      <Row className='rowCs1 mcs btcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Summary Sampling</div>
        </Col>
      </Row>
      <Row className='rowCs2 mcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Parameter</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Jumlah</div>
        </Col>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Persentase</div>
        </Col>
      </Row>
      <Row className='rowCs2 mcs'>
        <Col className='text-align-center'>
          <div>Kurang</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.rakSampling-(valueX.perRak*Form.length) < 0 ? (valueX.perRak*Form.length) - valueX.rakSampling : 0}</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.rakSampling-(valueX.perRak*Form.length) < 0 && valueX.perRak*Form.length !== 0? (((valueX.perRak*Form.length) - valueX.rakSampling)/(valueX.perRak*Form.length)*100).toFixed(2) : 0} %</div>
        </Col>
      </Row>
      <Row className='rowCs2 mcs'>
        <Col className='text-align-center'>
          <div>Lebih</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.rakSampling-(valueX.perRak*Form.length) > 0 ? valueX.rakSampling-(valueX.perRak*Form.length) : 0}</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.rakSampling-(valueX.perRak*Form.length) > 0 && valueX.perRak*Form.length !== 0? ((valueX.rakSampling-(valueX.perRak*Form.length))/(valueX.perRak*Form.length)*100).toFixed(2) : 0} %</div>
        </Col>
      </Row>
      <Row className='rowCs2 mcs'>
        <Col className='text-align-center'>
          <div>Infetile</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.infertile}</div>
        </Col>
        <Col className='text-align-center'>
          <div>{ valueX.perRak*Form.length > 0 ? (valueX.infertile/(valueX.perRak*Form.length)*100).toFixed(2) : 0} %</div>
        </Col>
      </Row>
      <Row className='rowCs2 mcs'>
        <Col className='text-align-center'>
          <div>Explode</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.explode}</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.perRak*Form.length > 0 ? (valueX.explode/(valueX.perRak*Form.length)*100).toFixed(2) : 0} %</div>
        </Col>
      </Row>
      <Row className='rowCs2 mcs'>
        <Col className='text-align-center'>
          <div>DIS</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.dis}</div>
        </Col>
        <Col className='text-align-center'>
          <div>{valueX.perRak*Form.length >0 ? (valueX.dis/(valueX.perRak*Form.length)*100).toFixed(2) : 0} %</div>
        </Col>
      </Row>
      {/* jangan dihapus */}
      <Row className='rowCs mcs btcs'>
        <Col className='text-align-center'>
          <div className='fwcs uncs'>Total</div>
          <div>{ valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-(valueX.rakSampling-(valueX.perRak*Form.length))} ( { isNaN(kekurangan) || jumlahSample == 0 || valueX.perRak==0 ? '0' : (kekurangan*100).toFixed(2) } %)</div>
        </Col>
      </Row>
    </div>
    <div className='cardCs'>
      <Row bgColor='teal' className='quotacss rowCs'>
        <Col className='text-align-center'>Penggantian : { (valueX.rakSampling-(valueX.perRak*Form.length)) > 0 ? valueX.infertile+valueX.explode+valueX.dis+valueX.kurang : valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-(valueX.rakSampling-(valueX.perRak*Form.length)) } ( { isNaN(kekurangan) || jumlahSample == 0 || valueX.perRak==0 ? '0' : (valueX.rakSampling-(valueX.perRak*Form.length)) > 0 ? (((valueX.infertile+valueX.explode+valueX.dis+valueX.kurang)/(valueX.perRak*Form.length))*100).toFixed(2) : (((valueX.infertile+valueX.explode+valueX.dis+valueX.kurang-(valueX.rakSampling-(valueX.perRak*Form.length)))/(valueX.perRak*Form.length))*100).toFixed(2)} %)</Col>
      </Row>
      <Row className='rowCs mcs'>
        <Col className='text-align-center'>
          <div className='fwcs'>&#x2211; Penggantian : {isNaN(penggantian) || penggantian < 0 || jumlahSample == 0? '0' : Math.round(penggantian)} Btr ( { valueX.perRak == 0 || penggantian< 0 || isNaN(penggantian) || jumlahSample ==0 ? '0' : Math.floor(Math.round(penggantian)/valueX.perRak)} rak, { valueX.perRak == 0 || penggantian < 0 || isNaN(penggantian) || jumlahSample==0? '0' : Math.round(penggantian) - (Math.floor(Math.round(penggantian)/valueX.perRak)*valueX.perRak) } btr )</div>
          <div className='fwcs'>Quota (tidak mengganti) : {isNaN(penggantian) || penggantian < 0 || jumlahSample == 0 ? ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) : ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) - Math.round(penggantian)} Btr</div>
        </Col>
      </Row>
    </div>
    <div className='moreCs'>
      <Button onClick={() => setloginScreenOpened(true)} bgColor='blue' color='white'>Buat Pdf</Button>
    </div>
    <div className='moreCs'>
      <Button onClick={() => f7router.back()} bgColor='orange' color='white'>Kembali CalPes</Button>
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
        <Button onClick={() => {pdf(JudulPdf, valueX, quota, Form, jumlahSample, penggantian); setloginScreenOpened(false);}} bgColor='blue' color='white'>Simpan Pdf</Button>
        <div className='undclose' onClick={() => { setloginScreenOpened(false);}}>Close</div>
        </div>
      </Page>
    </LoginScreen>
  </Page>
)};
export default Adv;