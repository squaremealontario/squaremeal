import { useNavigate } from "react-router-dom";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


var TheDropDown = (prop) =>
    {
        const navigate = useNavigate();


        return(
            <>
                <div className='inn-o-f-p-o-a'>
                    <div className='body-o-f-p-o-a'>
                        <div className='in-flex justify-content-evenly align-items-center'>
                            {
                                prop.isActive?
                                <>
                                 <div className='the-ops flex justify-content-around align-items-center active'>
                                    <span>Post</span>
                                    <BackupOutlinedIcon></BackupOutlinedIcon>
                                </div>
                                </>
                                :
                                <>
                                 <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{prop.theID(prop.id); prop.PostOpen(true)}}>
                                    <span>Post</span>
                                    <BackupOutlinedIcon></BackupOutlinedIcon>
                                </div>
                                </>
                            }
                            <div className='the-ops flex justify-content-around align-items-center' onClick={() => { navigate('/Supporter/Add-Product'); }}>
                                <span>Update</span>
                                <CreateOutlinedIcon></CreateOutlinedIcon>
                            </div>
                            {
                                prop.isActive?
                                <>
                                <div className='the-ops flex justify-content-around align-items-center active'>
                                    <span>Delete</span>
                                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                                </div>
                                </>
                                :
                                <>
                                <div className='the-ops flex justify-content-around align-items-center' onClick={() => { navigate('/Supporter/Add-Product'); }}>
                                    <span>Delete</span>
                                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                                </div>
                                </>
                            }
                            <div className='the-ops flex justify-content-around align-items-center' onClick={() => { navigate('/Supporter/Add-Product'); }}>
                                <span>Details</span>
                                <InfoOutlinedIcon></InfoOutlinedIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default TheDropDown;