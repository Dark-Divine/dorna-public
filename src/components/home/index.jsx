import BottomNavigation from '../share/BottomNavigation'
import coinIcon from '../../assets/img/coin-motion.gif'
import educationIcon from '../../assets/img/category/education-icon-Graphics-14489026-2-580x3871.png'
import researchIcon from '../../assets/img/category/research.png'
import mddIcon from '../../assets/img/category/3875571.png'
import techIcon from '../../assets/img/category/tech.jpg'
import newsIcon from '../../assets/img/category/news.png'
import workshopIcon from '../../assets/img/category/workshop.png'
import bannerIcon from '../../assets/img/banner1.png'
import ProjectsBannerIcon from '../../assets/img/dorna-home-banner.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import diseaseIcon from '../../assets/img/home/1.png'
import productsIcon from '../../assets/img/home/3.png'
import { useFetchDornaCoins } from '../../hooks/home/useFetchDornaCoins'
import NewsSection from './news'
import { Skeleton } from '@nextui-org/react'

const homeItems = [
    {
        icon: educationIcon,
        title: 'آموزشی',
        href: '/exam',
    },
    {
        icon: researchIcon,
        title: 'تحقیقاتی',
        href: '/projects',
    },
    {
        icon: techIcon,
        title: 'tech',
        href: '/tech',
    },
    {
        icon: newsIcon,
        title: 'تازه‌های‌علم‌جهان',
        href: '/news',
    },
    {
        icon: workshopIcon,
        title: 'ورکشاپ',
        href: '/workshops',
    },
    {
        icon: mddIcon,
        title: 'آزمایشگاه',
        href: '#',
    },
]

const HomeComponent = () => {
    const id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')

    // const [search, setSearch] = useState()
    const [key, setKey] = useState()

    // Fetch
    const { data: coinData, isLoading } = useFetchDornaCoins()

    // useEffect(() => {
    //     localStorage.setItem('bottom_link', 2)
    // }, [])

    useEffect(() => {
        if (coinData) {
            localStorage.setItem(
                'last_auth_date',
                new Date().toLocaleDateString()
            )
        }
    }, [coinData])

    // const handleSearchOnNews = (value) => {
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchPageone&contenttitle=${value}&apikey=${process.env.REACT_APP_API_KEY}`
    //         )
    //         .then(function (response) {
    //             setSearch(() => response?.data)
    //         })
    // }

    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         handleSearchOnNews(key)
    //     }, 1000)

    //     return () => {
    //         clearTimeout(handler)
    //     }
    // }, [key])

    // const handleSearchOnThreads = (e) => {
    //     const value = e.target.value
    //     if (value === '') return
    //     setKey(() => value)
    // }

    return (
        <>
            <section class="AZ-page-container AZ-homepage">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="d-flex align-items-center justify-content-between py-4">
                                <div class="d-flex align-items-center gap-1">
                                    <img
                                        src={coinIcon}
                                        alt=""
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                        }}
                                    />
                                    {isLoading ? (
                                        <Skeleton className="w-20 h-8 rounded-md" />
                                    ) : (
                                        <h2 class="credit">
                                            {coinData.dorna
                                                ? coinData.dorna
                                                : '0'}
                                            درنا کوین
                                        </h2>
                                    )}
                                </div>
                                <Link to="/notification" class="notif-btn">
                                    <span class="icon-bell"></span>
                                </Link>
                            </div>
                            {/* <div class="AZ-search-wrapper">
                        <button type="button"><span class="icon-search"></span></button>
                        <input type="search" placeholder="جستجو ..." onChange={(e) => handleSearchOnThreads(e)} />
                        </div> */}

                            <Link
                                to="/exam"
                                class="banner-img AZ-img-container"
                            >
                                <div class="AZ-img-container-inner AZ-img-cover">
                                    <img src={bannerIcon} alt="" />
                                </div>
                                <div class="banner-content">
                                    <p class="banner-text text-center">
                                        با ما آزمون بده و جزوه بگیر
                                    </p>
                                    <div class="d-flex align-items-center justify-content-end mt-2">
                                        <span class="banner-text">آموزشی</span>
                                    </div>
                                </div>
                            </Link>
                            <div class="swiper categorySwiper AZ-category-section">
                                <div class="swiper-wrapper">
                                    <Swiper
                                        className="mySwiper"
                                        slidesPerView={3}
                                        spaceBetween={20}
                                    >
                                        {homeItems
                                            ?.slice(0, 3)
                                            ?.map((item, i) => {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="swiper-slide">
                                                            <Link
                                                                to={item.href}
                                                                class="d-flex flex-column align-items-center justify-content-center"
                                                            >
                                                                <div
                                                                    className="category-img"
                                                                    style={{
                                                                        height: '50px',
                                                                    }}
                                                                >
                                                                    <div className="AZ-img-container-inner ">
                                                                        <img
                                                                            src={
                                                                                item.icon
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <h5 className="category-title">
                                                                    {item.title}
                                                                </h5>
                                                            </Link>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                    </Swiper>
                                </div>
                            </div>
                            <div class="swiper categorySwiper AZ-category-section">
                                <div class="swiper-wrapper">
                                    <Swiper
                                        className="mySwiper"
                                        slidesPerView={3}
                                        spaceBetween={20}
                                    >
                                        {homeItems
                                            ?.slice(3, 6)
                                            ?.map((item, i) => {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="swiper-slide">
                                                            <Link
                                                                to={item.href}
                                                                class="d-flex flex-column align-items-center justify-content-center"
                                                            >
                                                                <div
                                                                    className="category-img"
                                                                    style={{
                                                                        height: '50px',
                                                                    }}
                                                                >
                                                                    <div className="AZ-img-container-inner ">
                                                                        <img
                                                                            src={
                                                                                item.icon
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <h5 className="category-title">
                                                                    {item.title}
                                                                </h5>
                                                            </Link>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                    </Swiper>
                                </div>
                            </div>
                            {/* <div className="home-top-icons">
                        {homeItems?.map((item, i) => {
                            return <div key={i} className="item">
                            <Link to={item.href}
                            class="d-flex flex-column align-items-center justify-content-center">
                            <div className="category-img AZ-img-container">
                            <div className="AZ-img-container-inner ">
                            <img src={item.icon} alt="" />
                            </div>
                            </div>
                            <h5 className="category-title">{item.title}</h5>
                            </Link>
                            </div>
                            })}
                    </div> */}

                            <div className={'d-flex gap-2 mt-4'}>
                                <Link
                                    to={'/products'}
                                    className={
                                        'col AZ-post-card text-secondary shadow-sm'
                                    }
                                >
                                    <div
                                        className={
                                            'd-flex justify-content-between align-items-center'
                                        }
                                        style={{ fontSize: 'small' }}
                                    >
                                        فرمالیسیون های ساختنی و داروهای ترکیبی
                                        <img
                                            src={productsIcon}
                                            alt=""
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </Link>
                                <Link
                                    to={'/disease'}
                                    className={
                                        'col AZ-post-card text-secondary shadow-sm'
                                    }
                                >
                                    <div
                                        className={
                                            'd-flex justify-content-between'
                                        }
                                    >
                                        otc تراپی
                                        <img
                                            src={diseaseIcon}
                                            alt=""
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className={'d-flex gap-2 mt-2'}></div>
                            <Link
                                to="/exam"
                                class="banner-img AZ-img-container"
                            >
                                <div class="AZ-img-container-inner AZ-img-cover">
                                    <img src={bannerIcon} alt="" />
                                </div>
                                <div class="banner-content">
                                    <p class="banner-text text-center">
                                        با ما آزمون بده و جزوه بگیر
                                    </p>
                                    <div class="d-flex align-items-center justify-content-end mt-2">
                                        <span class="banner-text">آموزشی</span>
                                    </div>
                                </div>
                            </Link>

                            <NewsSection />

                            <Swiper
                                className="mySwiper"
                                slidesPerView={1}
                                spaceBetween={20}
                            >
                                <SwiperSlide>
                                    <Link
                                        to="/projects"
                                        class="banner-img AZ-img-container"
                                    >
                                        <div class="AZ-img-container-inner AZ-img-contain">
                                            <img
                                                src={ProjectsBannerIcon}
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link
                                        to="/projects"
                                        class="banner-img AZ-img-container"
                                    >
                                        <div class="AZ-img-container-inner AZ-img-contain">
                                            <img
                                                src={ProjectsBannerIcon}
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
                <BottomNavigation />
            </section>
        </>
    )
}
export default HomeComponent
