import React from 'react'
import { useFetchNews } from '../../../hooks/home/useFetchNews'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from '@nextui-org/react'
import { decodeHtml } from '../../../utils/decodeHtml'

export default function NewsSection() {
    const { data: newsData } = useFetchNews()

    return (
        <div className="mt-5">
            <h3 class="AZ-section-title mb-4">تازه‌های‌علم‌جهان</h3>
            <div class="swiper blogSwiper ">
                <div class="swiper-wrapper">
                    <Swiper
                        className="mySwiper"
                        slidesPerView={2}
                        spaceBetween={20}
                    >
                        {newsData &&
                            newsData.length > 0 &&
                            newsData?.map((n, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="swiper-slide">
                                            <Link
                                                href={`/news/${n.Id}`}
                                                className="AZ-post-card"
                                            >
                                                <div className="post-card-img AZ-img-container">
                                                    <div className="AZ-img-container-inner AZ-img-cover">
                                                        <img
                                                            src={`${process.env.REACT_APP_FILEMANAGER}${n.CoverImage}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <h4 className="post-card-title line-clamp-1">
                                                    {n.contenttitle}
                                                </h4>
                                                <p
                                                    style={{
                                                        whiteSpace: 'pre-line',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        wordBreak: 'break-word',
                                                    }}
                                                    className="post-card-text text-[#4e475d] line-clamp-2 !font-[IRANSans-Regular] !text-sm"
                                                    dangerouslySetInnerHTML={{
                                                        __html: decodeHtml(
                                                            n.shortdescriptioncontent
                                                        ),
                                                    }}
                                                ></p>
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <p className="read-more-btn d-flex align-items-center gap-1">
                                                        بیشتر بخوانید
                                                        <span className="icon-arrow-left2"></span>
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
