import React, { useState, useEffect } from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BasicCard from "./BasicCard";
import useStore from '../../useStore';
import { useObserver } from "mobx-react";

const drawerBleeding = 56;

function BottomDrawer(props) {

  const { counter } = useStore();
  const { window } = props;
  const [open, setOpen] = useState(true);
  const [datas, setDatas] = useState(counter.data);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    
  };

  useEffect(() => {
    //console.log(datas)
  }, []);

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return useObserver(() => (
    <div >
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(40% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box style={{backgroundColor:"#E7EBF0"}}>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }} 
          hideBackdrop={true}
          hysteresis={0.3}
          
        >
          <div className='drawerBox' >
            <span className='puller'/>
            <Typography sx={{ p: 2, color: 'text.secondary' }}>{counter.data.length} results</Typography>
            
          </div>
          <div className="cardBox">
            {datas?.map((x,i)=>(
              <BasicCard data={x} i={i}key={i}/>
            ))}
          </div>
        </SwipeableDrawer>
      </Box>
    </div>
  ));
}


export default BottomDrawer;
