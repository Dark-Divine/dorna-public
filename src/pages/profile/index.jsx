import BottomNavigation from '../../components/share/BottomNavigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Modal, Sheet, Typography } from '@mui/joy'
import { softLogoutLocalStorage } from '../../utils/logout'
import userInfoImage from '../../assets/img/user-info.png'

const Profile = () => {
    const [user, setUser] = useState()
    const id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('bottom_link', 3)
    }, [])

    const getUserProfile = () => {
        if (!id) return
        // axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserInfoWithToken&apikey=${process.env.REACT_APP_API_KEY}&token=${token}`)
        //     .then(function (response) {
        //         setUser(() => response.data[0]);
        //     });
        axios
            .get(
                `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getallinformationuser&apikey=${process.env.REACT_APP_API_KEY}&token=${token}&id=${id}`
            )
            .then(function (response) {
                setUser(() => response.data[0])
            })
    }

    useEffect(() => {
        getUserProfile()
        return () => {
            setUser([])
        }
    }, [])

    const handleLogOut = () => {
        // localStorage.clear();
        softLogoutLocalStorage()
        navigate('/')
        // codes below commented due to use the token again when logged in with previous number
        // axios.get(`${process.env.REACT_APP_API_GATEWAY}api/doupdateapi?func=uploadusertoken&Token=&DateTokenReceive=&TokenTimeReceive=&apikey=${process.env.REACT_APP_API_KEY}&ccid=${id}&userid=${id}`)
        //     .then(function (response) {
        //         if (response.data.error === 0) {
        //         }
        //     });
    }

    return (
        <section className="AZ-page-container AZ-dashboard-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex align-items-center gap-3 p-4">
                            <div className="profile-img AZ-img-container">
                                <div className="AZ-img-container-inner AZ-img-cover">
                                    <img
                                        src={
                                            user?.uploadphoto
                                                ? `${process.env.REACT_APP_FILEMANAGER}${user?.uploadphoto}`
                                                : userInfoImage
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <h4 className="username">
                                    {!!user && `${user?.Name} ${user?.Family}`}
                                </h4>
                                <span>( عادی )</span>
                            </div>
                        </div>
                        <ul className="dashboard-menu-list p-4 pt-0">
                            <li>
                                <Link
                                    to="/profile/information"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-drivers-license-o"></span>
                                    اطلاعات کاربری
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile/auth"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-edit-file"></span>
                                    احراز هویت
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/exam/full-report"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-clipboard"></span>
                                    سوابق آزمون‌ها
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile/credit"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-bitcoin"></span>
                                    مدیریت اعتبار
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile/workshops"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-presentation-board"></span>
                                    ورکشاپ‌ها
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile/support"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-headset_mic"></span>
                                    پشتیبانی
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile/invite"
                                    className="dashboard-link d-flex align-items-center gap-3"
                                >
                                    <span className="icon-share"></span>
                                    دعوت از دوستان
                                </Link>
                            </li>
                            <li onClick={() => setOpen(true)}>
                                <div
                                    className="dashboard-link d-flex align-items-center gap-3"
                                    data-bs-target="#logoutModal"
                                    data-bs-toggle="modal"
                                >
                                    <span className="icon-sign-out"></span>
                                    خروج
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <BottomNavigation />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        آیا میخواهید از برنامه خارج شوید ؟
                    </Typography>
                    <div className={'d-flex gap-2 mt-5'}>
                        <Button onClick={() => setOpen(false)}>خیر</Button>
                        <Button onClick={handleLogOut} color={'danger'}>
                            بله
                        </Button>
                    </div>
                </Sheet>
            </Modal>
        </section>
    )
}
export default Profile
