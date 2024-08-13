import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useContext, useEffect, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup } from '@mui/material';
import $ from 'jquery';
import { toast } from 'react-toastify';
import MyContext from './UserContext';


dayjs.extend(utc);
dayjs.extend(timezone);

var PostPopUp=(prop)=>
    {

        const [timenow, settimenow] = useState();
        const [FromTime, setFromTime] = useState();
        const [UptoTime, setUptoTime] = useState();
        const [TimeNow, setTimeNow] = useState();
        const [setAuto, setsetAuto] = useState(false);
        const [SixHoursLater, setSixHoursLater] = useState();
        const [AutoSTime, setAutoSTime] = useState();
        const [TimeTooLate, setTimeTooLate] = useState();
        const [MinTimeForFrom, setMinTimeForFrom] = useState();
        const [MaxTimeForUpto, setMaxTimeForUpto] = useState();
        const [TimeIsOK, setTimeIsOK] = useState(false);
        const [Quantity, setQuantity] = useState();
        const [AfterMinute, setAfterMinute] = useState();
        const [ProductData, setProductData] = useState([]);
        const [fadeLoad,setFadeLoad] = useState("display-none");
        const [loadingRage,setloadingRage] = useState("display-none");
        const {user, setUser} = useContext(MyContext);
        const MINUTE_MS = 60000;

        

        useEffect(() => {
            var now = new Date();
            var delay = (60 - now.getSeconds()) * 1000; // Milliseconds until the next minute
        
            setTimeout(function() {
                updateSavebtn();
                const interval = setInterval(() => {
                    setAfterMinute(new Date());
                }, MINUTE_MS);
              }, delay);
        
        }, [])

        useEffect(()=>
        {
            document.title = 'Create Post | Square Meal';
            fetchProducts();
        }, [])

        useEffect(()=>
        {
            const now = new Date();
            if(setAuto)
                {
                    if(FromTime && UptoTime && AutoSTime)
                    {
                        if(FromTime.$d<=now || UptoTime.$d<=now || AutoSTime.$d<=now)
                            {
                                if(TimeIsOK)
                                {
                                    setTimeIsOK(false)
                                }
                            }
                            else
                            {
                                console.log(AutoSTime)
                                if(!TimeIsOK)
                                    {
                                        setTimeIsOK(true);
                                    }
                            }
                            
                    }
                    else
                    {
                        if(TimeIsOK)
                            {
                                setTimeIsOK(false);
                            }
                    }
                }
                else
                {
                    if(FromTime && UptoTime)
                        {
                            if(FromTime.$d<=now || UptoTime.$d<=now)
                                {
                                    if(TimeIsOK)
                                    {
                                        setTimeIsOK(false)
                                    }
                                }
                                else
                                {
                                    if(!TimeIsOK)
                                        {
                                            setTimeIsOK(true);
                                        }
                                }
                        }
                        else
                        {
                            if(!TimeIsOK)
                                {
                                    setTimeIsOK(true);
                                }
                        }
                }
        }, [FromTime, UptoTime, AutoSTime, setAuto])

        useEffect(()=>
        {
            updateSavebtn();
        }, [AfterMinute])

        const updateSavebtn=()=> {
            const now = new Date();

            if(setAuto)
            {
                if(FromTime && UptoTime && AutoSTime)
                {
                    if(FromTime.$d<=now || UptoTime.$d<=now || AutoSTime.$d<=now)
                        {
                            if(TimeIsOK)
                            {
                                setTimeIsOK(false)
                            }
                        }
                }
                else
                {
                    if(TimeIsOK)
                        {
                            setTimeIsOK(false);
                        }
                }
            }
            else
            {
                if(FromTime && UptoTime)
                    {
                        if(FromTime.$d<=now || UptoTime.$d<=now)
                            {
                                if(TimeIsOK)
                                {
                                    setTimeIsOK(false)
                                }
                            }
                    }
            }
                
        }
        
        

        function roundMinutesToNextMultipleOfFive(date) {
            let minutes = date.getMinutes();
            let roundedMinutes = Math.ceil(minutes / 5) * 5;
        
            if (roundedMinutes === 60) {
                date.setHours(date.getHours() + 1);
                roundedMinutes = 0;
            }
        
            date.setMinutes(roundedMinutes);
            date.setSeconds(0); // Optional: Reset seconds to 0
        
            return date;
        }

        const addHours = (date, hours) => {
            return new Date(date.getTime() + hours * 60 * 60 * 1000);
          };

        const addHoursDynamic = (date, hours) => {
            return new Date(date + hours * 60 * 60 * 1000);
          };

        const minusHours = (date, hours) => {
            return new Date(date - hours * 60 * 60 * 1000);
          };

        useEffect(()=>
        {
            setMinTimeForFrom(dayjs(minusHours(UptoTime,6)));
            const now = new Date();
            setTimeNow(now);
            var a = UptoTime;
            const sixHoursAgo = minusHours(a, 6);
            setSixHoursLater(dayjs(sixHoursAgo));
            if(SixHoursLater && a)
            {
                if(SixHoursLater.$d!="Invailid Date")
                {
                    setSixHoursLater(dayjs(sixHoursAgo));
                    if (a.$d < addHours(now, 6)) {
                        setTimeTooLate(false);
                    } else {
                        setTimeTooLate(true);
                    }  
                }
            }
        }, [UptoTime])
        

        var fetchProducts =async()=>
            {
                try
                {
                    var data = {id:prop.ID};
                    const resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchForPosting`,
                    {
                        method:"post",
                        body:JSON.stringify(data),
                        headers:{'Content-type':'application/json'}
                    });
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===0)
                        {
                            setProductData();
                        }
                        else if(result.statuscode===1)
                        {
                            setProductData(result.membsdata);
                            console.log(result.membsdata)
                        }
                    }
                    else
                    {
                        
                    }
                }
                catch
                {
                }
            }

        useEffect(()=>
        {
            setMaxTimeForUpto(dayjs(addHoursDynamic(FromTime,6)));
            const now = new Date();
            setTimeNow(now);
            var a = FromTime;
            const sixHoursAgo = minusHours(FromTime, 6);
            if(SixHoursLater && a)
                {
                    if(SixHoursLater.$d!="Invailid Date")
                        {
                            setSixHoursLater(dayjs(sixHoursAgo));
                            if (a.$d < addHours(now, 6)) {
                                setTimeTooLate(false);
                            } else {
                                setTimeTooLate(true);
                            }   
                        }
                }
            
            
        }, [FromTime])

        var OnPublish=async()=>
        {
            var a = setloadingRage("display-block");
            var b = setFadeLoad("display-block");
            var registerData = {ProductID:prop.ID, UserID:user._id, FromTime, UptoTime, setAuto, AutoSTime, Quantity}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/publish-post`,
            {
                method:"post",
                body:JSON.stringify(registerData),
                headers:{'Content-type':'application/json'}
            })
    
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===2)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.success(`Post will be published at ${(AutoSTime.$H % 12 || 12).toString().padStart(2, '0')}:${AutoSTime.$m.toString().padStart(2, '0')} ${AutoSTime.$H >= 12 ? 'PM' : 'AM'} on ${(AutoSTime.$D).toString().padStart(2, '0')}/${((AutoSTime.$M)+1).toString().padStart(2, '0')}/${AutoSTime.$y}`, {
                        position: "top-center"
                        });
                        setTimeout(()=>
                            {
                                prop.closeCommand(false)
                            }, 300)
                    },300);
                }
                if(result.statuscode===1)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.success(`Post Published Successfuly`, {
                        position: "top-center"
                        });
                        setTimeout(()=>
                            {
                                prop.closeCommand(false)
                            }, 300)
                    },300);
                }
                else if(result.statuscode===0)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Error!`, {
                            position: "top-center"
                        });
                    },300);
                }
            }
            else
            {
                setloadingRage("load-complete");
                var ce = setTimeout(function() {
                    var d = setloadingRage("display-none");
                    var e = setFadeLoad("display-none");
                    toast.error(`Error! Please check the information again`, {
                        position: "top-center"
                    });
                },300);
            }
        }

        return(
            <>

            <div className="thepost-popoup-env">
                <div className="inn-t-p-p">
                    <div className="the-body-tpp">
                        <div className="inn-tpp-body">
                            <div className="tpp-b-flex">
                                <div className="left-tpp-for-view p-5">
                                    <div className="final-view-ui-thepost position-relative">
                                        <div className="inner-body-ttp">
                                            <div className="inn-u-i-ttp">
                                                <div className='position-relative'>
                                                    <img src={`/ProductUploads/${ProductData?.Image}`}/>
                                                    <div className='theupper-name-n-logo'>
                                                        <div className='flex align-items-center'>
                                                            <img src='/img/tims.png'/>
                                                            <h6>Tim Hortons</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="the-details-ttp">
                                                    <div className="grid-inner-detail-">
                                                        <div className="left-side-inner-flex-details">
                                                            <h6><ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon> {ProductData?.Title}</h6>
                                                            <h6><StarOutlinedIcon style={{color:"red"}}></StarOutlinedIcon> 3.3 (102)</h6>
                                                        </div>
                                                        <div className='right-side-inner-flex-details'>
                                                            <span className='original-price'>
                                                                CA${ProductData?.OriginalPrice}
                                                            </span>
                                                            <span className='the-price'>
                                                                CA${ProductData?.Price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='thegiven-timing-ttp'>
                                                        <h6>
                                                        <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon> Collect: {
                                                            FromTime && UptoTime?
                                                            <>
                                                            {`${(FromTime.$H % 12 || 12).toString().padStart(2, '0')}:${FromTime.$m.toString().padStart(2, '0')} ${FromTime.$H >= 12 ? 'PM' : 'AM'} - ${(UptoTime.$H % 12 || 12).toString().padStart(2, '0')}:${UptoTime.$m.toString().padStart(2, '0')} ${UptoTime.$H >= 12 ? 'PM' : 'AM'}`}
                                                            </>:null
                                                        }
                                                        </h6>
                                                        <h6>
                                                        <ProductionQuantityLimitsOutlinedIcon></ProductionQuantityLimitsOutlinedIcon> Quantity: {
                                                            Quantity?
                                                            <>{Quantity}</>:null
                                                        }
                                                        </h6>
                                                    </div>

                                                </div>

                                                <div className='down-the-location-ttp'>
                                                    <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                                                    <h6>205 Humber College, Etobicoke, ON, Canada</h6>
                                                    <ArrowForwardIosOutlinedIcon></ArrowForwardIosOutlinedIcon>
                                                </div>

                                                <div className='the-description-ttp'>
                                                    <h5>About the meal</h5>
                                                    <h6>
                                                        {ProductData?.Description}
                                                    </h6>
                                                    <div className='the-tags-categories'>
                                                        {
                                                            ProductData?.isBread?
                                                            <span>Bread & Pasteries</span>:null
                                                        }
                                                        {
                                                            ProductData?.isGlutenFree?
                                                            <span>Gluten</span>:null
                                                        }
                                                        {
                                                            ProductData?.isNonVeg?
                                                            <span>Non Veg</span>:null
                                                        }
                                                        {
                                                            ProductData?.isVegan?
                                                            <span>Vegan</span>:null
                                                        }
                                                        {
                                                            ProductData?.isVeg?
                                                            <span>Vegetarian</span>:null
                                                        }
                                                    </div>
                                                </div>

                                                <div className='thespecialnote-ttp'>
                                                <h5>You need to know</h5>
                                                    <h6>
                                                    {ProductData?.SpecialNote}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <img className="mobile-ui" src={`/img/mobileui.png`}/>
                                    </div>
                                </div>

                                <div className='right-side-for-inputs overflow-auto'>
                                    <div className='right-s-f-i-inn'>
                                        <div className='a-little-outer-flex p-5 overflow-auto'>
                                            <div className='inn-r-s-f-i'>
                                                <div className='body-inn-r-s-f-i'>
                                                    <div className='the-label-r-s-f-i mb-3'>
                                                        <h5>Pickup Timing <span>(Can't edit pickup time after posting)</span></h5>
                                                    </div>
                                                    <div className='inn-body-flex flex align-items-center justify-content-between'>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoItem>
                                                                <DateTimePicker disablePast
                                                                    maxDateTime={UptoTime ? UptoTime : null}
                                                                    label="Pickup Time From"
                                                                    defaultValue={timenow ? timenow : null}
                                                                    onChange={(e) => {e?setFromTime(e.tz('America/Toronto')):setFromTime(null)}} />
                                                            </DemoItem>
                                                        </LocalizationProvider>
                                                        <h5>TO</h5>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoItem>
                                                                <DateTimePicker disablePast
                                                                    minDateTime={FromTime ? FromTime : null}
                                                                    maxDateTime={MaxTimeForUpto ? MaxTimeForUpto : null}
                                                                    label="Pickup Time Upto"
                                                                    defaultValue={timenow ? timenow : null}
                                                                    onChange={(e) => {e?setUptoTime(e.tz('America/Toronto')):setUptoTime(null)}} />
                                                            </DemoItem>
                                                        </LocalizationProvider>
                                                    </div>
                                                    {
                                                        TimeTooLate ?
                                                            <>
                                                                <div className='note-for-dateinvalid mt-3'>
                                                                    <h6>You can't post more than 6 hours before your pickup time. For example, if the current time is 12 a.m. and you are setting 6 a.m.-7 a.m. as pickup time, then it can be posted at 1 a.m. You can either draft your post to publish later or set an automatic schedule.</h6>
                                                                </div>
                                                            </> : null
                                                    }

                                                    <div className='mt-3 flex'>
                                                        <FormGroup>
                                                            <FormControlLabel control={<Checkbox onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setsetAuto(true);
                                                                }
                                                                else {
                                                                    setsetAuto(false);
                                                                }
                                                            }} />} label="Set Automatic Schedule" />
                                                        </FormGroup>
                                                    </div>
                                                    {
                                                        setAuto && FromTime && SixHoursLater ?
                                                            <>
                                                                <div className='mt-3'>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <DemoItem>
                                                                            <DateTimePicker
                                                                                disablePast
                                                                                minDateTime={SixHoursLater}
                                                                                maxDateTime={FromTime}
                                                                                label="Set Automatic Timing"
                                                                                defaultValue={AutoSTime || null}
                                                                                Value={AutoSTime || null}
                                                                                onChange={(e) =>{e?setAutoSTime(e.tz('America/Toronto')):setAutoSTime(null)}}
                                                                            />
                                                                        </DemoItem>
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </> : null
                                                    }

                                                    <div className='mt-4'>
                                                        <div className='the-label-r-s-f-i pb-3'>
                                                            <h5>Set Quantity</h5>
                                                        </div>
                                                        <FormControl fullWidth sx={{ m: 1 }}>
                                                            <InputLabel htmlFor="outlined-adornment-amsount">Quantity</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-amount"
                                                                startAdornment={<InputAdornment position="start"><ProductionQuantityLimitsOutlinedIcon></ProductionQuantityLimitsOutlinedIcon></InputAdornment>}
                                                                label="Quantity"
                                                                onChange={(e) => setQuantity(e.target.value)}
                                                                onDrop={(e)=>{
                                                                    const isNumber = /^[0-9]$/.test(e.key);
                                                                    const isBackspace = (e.key === 'Backspace');
                                                                    if (!isNumber && !isBackspace) {
                                                                        e.preventDefault();
                                                                    }}}
                                                                onPaste={(e)=>{
                                                                    const isNumber = /^[0-9]$/.test(e.key);
                                                                    const isBackspace = (e.key === 'Backspace');
                                                                    if (!isNumber && !isBackspace) {
                                                                        e.preventDefault();
                                                                    }}}
                                                                onKeyDown={(e)=>{
                                                                    const isNumber = /^[0-9]$/.test(e.key);
                                                                    const isBackspace = (e.key === 'Backspace');
                                                                    if (!isNumber && !isBackspace) {
                                                                        e.preventDefault();
                                                                    }}}
                                                            />
                                                        </FormControl>
                                                    </div>


                                                </div>

                                            </div>
                                            <div className='post-popup-btns mt-5'>
                                                <div className='inner-p-p-b'>
                                                    <div className='flex align-items-center gap-4'>
                                                        {
                                                            TimeIsOK?
                                                            <>
                                                            {
                                                                TimeNow && UptoTime && Quantity && !isNaN(Quantity)?
                                                                <>
                                                                <button className='active' onClick={OnPublish}>Publish</button>
                                                                </>:null
                                                            }
                                                            {/* <button className='active'>Save as draft</button> */}
                                                            </>
                                                            :
                                                            <>
                                                            {
                                                                TimeNow && UptoTime && Quantity && !isNaN(Quantity)?
                                                                <>
                                                                <button className='disabled'>Publish</button>
                                                                </>:null
                                                            }
                                                            {/* <button className='disabled'>Save as draft</button> */}
                                                            </>
                                                        }
                                                        <button className='active' onClick={()=>{ 
                                                                $(".thepost-popoup-env .the-body-tpp").addClass("PostPopupClose")
                                                            setTimeout(()=>
                                                            {
                                                                prop.closeCommand(false)
                                                            }, 300)
                                                            }}>Discard</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="loading-line">
            <div className={`loading-range ${loadingRage}`}>

            </div>
        </div>

        <div className={`fade-screen ${fadeLoad}`}>

        </div>


            </>
        )
    }

export default PostPopUp;