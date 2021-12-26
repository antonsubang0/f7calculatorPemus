import React from 'react';
import LogoSlide from '../assets/icon.png'
import { Panel, Page, List, ListItem, Navbar, NavTitle, Link, View} from 'framework7-react';
export default function Panelx() {
  return (
    <Panel resizable left bgColor="#000000">
        <View>
            <Page>
                <Navbar bgColor='teal' sliding={false}>
                    <NavTitle color='white'className="titlepanel">Menu</NavTitle>
                </Navbar>
                <List className="panellist">
                    <ListItem link="/" view=".view-main" panelClose title="CalPes 1"/>
                    <ListItem link="/adv/" view=".view-main" panelClose title="CalPes 2"/>
                    <ListItem link="/adv1/" view=".view-main" panelClose title="CalPes 3"/>
                </List>
                <div className="bg-slidemenu">
                    <img src={LogoSlide} alt="sjgajh" className='logoSlideMenu'/>
                </div>
            </Page>
        </View>
    </Panel>
  );
}
