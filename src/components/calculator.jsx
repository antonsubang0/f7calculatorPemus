import { LoginScreen, Page, Row, Col, Button, Icon, Navbar, NavTitle } from 'framework7-react';
import React, { useState } from 'react';

export default function CalculatorsW({calculator, closeCalculation}) {
  const [displayCalculator, setDisplayCalculator] = useState('');
  const [logikaCal, setlogikaCal] = useState('');  
  const [operatorX, setOperatorX] = useState('=');
  const [lastResult, setlastResult] = useState(0);
  const clearCalculator = () => {
    setDisplayCalculator('');
    setlastResult(0);
    setlogikaCal('');
  }
  const handleCalPad =(data)=>{
    if (data=='1') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='2') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='3') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='4') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='5') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='6') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='7') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='8') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='9') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='0') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='.') {
      setlastResult(0);
      setDisplayCalculator(displayCalculator+ data);
      setlogikaCal(logikaCal + data);
    }
    if (data=='-') {
      if (operatorX!== '=') {
        return;
      }
      if (lastResult!==0) {
        setDisplayCalculator(displayCalculator + lastResult + data);
        setlogikaCal(logikaCal + lastResult + data);
      } else {
        setDisplayCalculator(displayCalculator+ data);
        setlogikaCal(logikaCal + data);
      }
      setOperatorX(data);
      setlastResult(0);
    }
    if (data=='+') {
      if (operatorX!== '=') {
        return;
      }
      if (lastResult!==0) {
        setDisplayCalculator(displayCalculator + lastResult + data);
        setlogikaCal(logikaCal + lastResult + data);
      } else {
        setDisplayCalculator(displayCalculator+ data);
        setlogikaCal(logikaCal + data);
      }
      setOperatorX(data);
      setlastResult(0);
    }
    if (data=='/') {
      if (operatorX!== '=') {
        return;
      }
      if (lastResult!==0) {
        setDisplayCalculator(displayCalculator + lastResult + data);
        setlogikaCal(logikaCal + lastResult + data);
      } else {
        setDisplayCalculator(displayCalculator+ data);
        setlogikaCal(logikaCal + data);
      }
      setOperatorX(data);
      setlastResult(0);
    }
    if (data=='*') {
      if (operatorX!== '=') {
        return;
      }
      if (lastResult!==0) {
        setDisplayCalculator(displayCalculator + lastResult + data);
        setlogikaCal(logikaCal + lastResult + data);
      } else {
        setDisplayCalculator(displayCalculator+ data);
        setlogikaCal(logikaCal + data);
      }
      setOperatorX(data);
      setlastResult(0);
    }
    if (data=='=') {
      const array = logikaCal.split(operatorX);
      let result;
      if (operatorX=='-') {
        if (array.length>1) {
          result = (parseFloat(array[0])*1000000 - parseFloat(array[1])*1000000)/1000000;
        } else {
          result = parseFloat(array[0]) + 0;
        }
      }
      if (operatorX=='+') {
        if (array.length>1) {
          result = (parseFloat(array[0])*1000000 + parseFloat(array[1])*1000000)/1000000;
        } else {
          result = parseFloat(array[0]) + 0;
        }
      }
      if (operatorX=='*') {
        if (array.length>1) {
          result = Math.round(parseFloat(array[0]) * parseFloat(array[1])*1000000)/1000000;
        } else {
          result = parseFloat(array[0]) + 0;
        }
      }
      if (operatorX=='/') {
        if (array.length>1) {
          result = Math.round(parseFloat(array[0]) / parseFloat(array[1])*1000000)/1000000;
        } else {
          result = parseFloat(array[0]) + 0;
        }
      }
      if (operatorX=='=') {
        return;
      }
      setDisplayCalculator(displayCalculator + '=' + result + '\n');
      setlastResult(result);
      setlogikaCal('');
      setOperatorX('=');
    }

  }
  return (
    <LoginScreen
      className="demo-login-screen"
      opened={calculator}
    >
      <Page loginScreen>
        <Navbar bgColor='teal' sliding={false}>
            <NavTitle color='white'>Kalkulator Sederhana</NavTitle>
        </Navbar>
        <div className='flex'>
          <Row className='btnNum'>
            <Col className='text-align-right display'>
              <div className='contentz'>{displayCalculator.split('\n').map((data, index)=> (
                <div key={index}>{data}</div>
              ))}</div>
            </Col>
          </Row>
          <div className='bodyCal'>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={clearCalculator}><Button className='pyNumPadx' fill bgColor='teal'><Icon material="backspace"></Icon></Button></Col>
            <Col className='text-align-center' onClick={ closeCalculation } ><Button className='pyNumPadx' fill bgColor='teal'><Icon material="check"></Icon></Button></Col>
          </Row>
          <Row className='btnNum'>
          <Col className='text-align-center' onClick={()=>{ handleCalPad('7')}}><Button className='pyNumPadx' fill bgColor='teal'>7</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('8')}}><Button className='pyNumPadx' fill bgColor='teal'>8</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('9')}}><Button className='pyNumPadx' fill bgColor='teal'>9</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('/')}}><Button className='pyNumPadx' fill bgColor='teal'>/</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('4')}}><Button className='pyNumPadx' fill bgColor='teal'>4</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('5')}}><Button className='pyNumPadx' fill bgColor='teal'>5</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('6')}}><Button className='pyNumPadx' fill bgColor='teal'>6</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('*')}}><Button className='pyNumPadx' fill bgColor='teal'>x</Button></Col>
          </Row>
          <Row className='btnNum'>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('1')}}><Button className='pyNumPadx' fill bgColor='teal'>1</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('2')}}><Button className='pyNumPadx' fill bgColor='teal'>2</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('3')}}><Button className='pyNumPadx' fill bgColor='teal'>3</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('-')}}><Button className='pyNumPadx' fill bgColor='teal'>-</Button></Col>
          </Row>
          <Row className='btnNum'>
          <Col className='text-align-center' onClick={()=>{ handleCalPad('.')}}><Button className='pyNumPadx' fill bgColor='teal'>.</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('0')}}><Button className='pyNumPadx' fill bgColor='teal'>0</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('=')}}><Button className='pyNumPadx' fill bgColor='teal'>=</Button></Col>
            <Col className='text-align-center' onClick={()=>{ handleCalPad('+')}}><Button className='pyNumPadx' fill bgColor='teal'>+</Button></Col>
          </Row>
          </div>
        </div>
      </Page>
    </LoginScreen>
  );
}
