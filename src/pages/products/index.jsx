import HandlePreviousPageButton from '../../components/share/HandlePreviousPageButton'
import BottomNavigation from '../../components/share/BottomNavigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import LoadingComponent from '../../components/share/Loading'
import { useFetchDrugShapes } from '../../hooks/product/useFetchDrugShapes'
import { useFetchDrugsByShapeId } from '../../hooks/product/useFetchDrugsByShapeId'
import { cn } from '@nextui-org/react'
import { decodeHtml } from '../../utils/decodeHtml'

const colors = ['green', 'yellow', 'purple', 'blue', 'pink', 'orange']

const Products = () => {
    const [drugs, setDrugs] = useState()
    const [key, setKey] = useState()
    const [initial, setInitial] = useState(false)
    const [id, setId] = useState()

    const { data: shapes } = useFetchDrugShapes()

    const { data, isLoading } = useFetchDrugsByShapeId(id)
    console.log('shapes', shapes)
    console.log('data', data)

    // const handleGetData = async () => {
    //     await getShapes()
    //     await handleGetShapesById(44209)
    // }

    const handleSearch = async (value) => {
        if (!initial) return
        await axios
            .get(
                `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=SearchHandyDrugs&OnvanDaroTarkibi=${value}&id=${id}&apikey=${process.env.REACT_APP_API_KEY}`
            )
            .then(function (response) {
                setDrugs(() => response?.data)
            })
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch(key)
        }, 1000)

        return () => {
            clearTimeout(handler)
        }
    }, [key])

    const handleSearchOnThreads = (e) => {
        setInitial(true)
        const value = e.target.value
        setKey(() => value)
    }

    if (!shapes) return <LoadingComponent />

    return (
        <section class="AZ-page-container">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                            <h2 class="page-header-title text-center">
                                فرماسیون داروهای ترکیبی
                            </h2>
                            <HandlePreviousPageButton />
                        </div>
                        <div class="AZ-search-wrapper">
                            <button type="button">
                                <span class="icon-search"></span>
                            </button>
                            <input
                                type="search"
                                placeholder="جستجو ..."
                                onChange={(e) => handleSearchOnThreads(e)}
                            />
                        </div>
                    </div>
                    <div class="col-lg-12 pl-0">
                        <div class="">
                            <div class="swiper productsCategorySwiper auto-slide">
                                <div class="swiper-wrapper">
                                    <ul className="flex gap-2 overflow-x-scroll pb-2">
                                        {shapes?.map((item) => (
                                            <li
                                                onClick={() => setId(item.Id)}
                                                className={cn(
                                                    `py-2 px-3 font-[IRANSans-Regular] text-sm rounded-md`,
                                                    {
                                                        'bg-[#C4F4D166]/40 text-[#234D2E]':
                                                            item.HandydugsShapesCode ==
                                                            '6',
                                                        'bg-[#F3C0C066]/40 text-[#4C1C1C]':
                                                            item.HandydugsShapesCode ==
                                                            '5',
                                                        'bg-[#DC90C766]/40 text-[#401935]':
                                                            item.HandydugsShapesCode ==
                                                            '4',
                                                        'bg-[#5BBCC966]/40 text-[#123E44]':
                                                            item.HandydugsShapesCode ==
                                                            '3',
                                                        'bg-[#D6CBEC66]/40 text-[#2F1E53]':
                                                            item.HandydugsShapesCode ==
                                                            '2',
                                                        'bg-[#F1CF9C66]/40 text-[#5F3D0B]':
                                                            item.HandydugsShapesCode ==
                                                            '1',
                                                    }
                                                )}
                                            >
                                                {item.HandydugsShapeShapes}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            {isLoading || !data ? (
                                ''
                            ) : (
                                <div className="overflow-y-hidden overflow-x-scroll lg:hidden">
                                    <div className="flex flex-nowrap pb-2">
                                        {data ? (
                                            data
                                                .slice(0, 12)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="snap-start w-1/3 pr-3 block flex-[0_0_auto]"
                                                    >
                                                        <div className="flex relative w-full h-full items-center justify-center flex-col gap-2">
                                                            <div className="h-[130px] w-full">
                                                                <img
                                                                    src={`${process.env.REACT_APP_FILEMANAGER}${item.PicDaroTarkibi}`}
                                                                    alt=""
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                            </div>
                                                            <div className="flex gap-1 flex-col w-full px-2">
                                                                <h4 className="text-start text-sm line-clamp-1 rounded-xl text-[#291550] w-full">
                                                                    {
                                                                        item.OnvanDaroTarkibi
                                                                    }
                                                                </h4>
                                                                <p
                                                                    className="line-clamp-1 text-[#827797] text-xs"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: decodeHtml(
                                                                            item?.DescDaroTarkibi
                                                                        ),
                                                                    }}
                                                                ></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="w-full textui pt-2 pb-10 lg:max-w-full pl-2">
                                                <Skeleton className="w-full lg:max-w-full h-[282px] rounded-3xl" />
                                                <Skeleton className="w-full lg:max-w-full h-[282px] rounded-3xl" />
                                                <Skeleton className="w-full lg:max-w-full h-[282px] rounded-3xl" />
                                                <Skeleton className="w-full lg:max-w-full h-[282px] rounded-3xl" />
                                                <Skeleton className="w-full lg:max-w-full h-[282px] rounded-3xl" />
                                                <Skeleton className="w-full lg:max-w-full h-[282px] rounded-3xl" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* <div>
                                    {data.map((item) => (
                                        <div className="flex hover:scale-105 ease-in-out duration-200 relative hover:p-[1px] rounded-xl transition-all delay-75 w-full h-full items-center justify-center flex-col gap-3">
                                            <div className="max-w-[300px] max-h-[400px] ">
                                                <img
                                                    src={`${process.env.REACT_APP_FILEMANAGER}${item.PicDaroTarkibi}`}
                                                    alt=""
                                                />
                                            </div>
                                            <h4 className="text-end font-semibold rounded-xl text-[#6d7c88] w-full">
                                                {item.OnvanDaroTarkibi}
                                            </h4>
                                            <p>{item.DescDaroTarkibi}</p>
                                        </div>
                                    ))}
                                </div> */}
                        </div>
                        {/* <div class="my-5">
                            <Swiper
                                className="mySwiper"
                                slidesPerView={3}
                                spaceBetween={20}
                            >
                                {data?.map((d, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div
                                                className="swiper productsSwiper"
                                                key={i}
                                            >
                                                <div className="swiper-wrapper">
                                                    <div className="swiper-slide">
                                                        <div className="AZ-product-card">
                                                            <Link
                                                                to={`/products/${d.Id}`}
                                                            >
                                                                {d.PicDaroTarkibi && (
                                                                    <div className="product-card-img AZ-img-container">
                                                                        <div className="AZ-img-container-inner AZ-img-cover">
                                                                            <img
                                                                                src={`${process.env.REACT_APP_FILEMANAGER}${d.PicDaroTarkibi}`}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <h4 className="product-card-name">
                                                                    {
                                                                        d.OnvanDaroTarkibi
                                                                    }
                                                                </h4>
                                                                <p className="product-card-text text-overflow-50">
                                                                    {
                                                                        d.DescDaroTarkibi
                                                                    }
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <BottomNavigation /> */}
        </section>
    )
}
export default Products
