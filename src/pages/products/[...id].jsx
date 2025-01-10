import BottomNavigation from '../../components/share/BottomNavigation'
import HandlePreviousPageButton from '../../components/share/HandlePreviousPageButton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { decodeHtml } from '../../utils/decodeHtml'
import { useFetchDrugInfo } from '../../hooks/product/useFetchDrugInfo'

const tabs = [
    { key: 1, title: 'جزییات' },
    { key: 2, title: 'ترکیبات' },
    { key: 3, title: 'اشکال و دوز های موجود' },
    { key: 4, title: 'روش تهیه' },
]

const ProductById = () => {
    const [activeTab, setActiveTab] = useState(1)

    const { id } = useParams()
    const { data: drug } = useFetchDrugInfo(id)

    if (!drug) {
        return 'درحال بارگیری...'
    }

    return (
        <section class="AZ-page-container AZ-product-page overflow-auto">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                            <h2 class="page-header-title text-center">
                                {drug?.OnvanDaroTarkibi}
                            </h2>
                            <HandlePreviousPageButton />
                        </div>
                    </div>
                    <div class="col-lg-12 px-0">
                        <div class="swiper gallerySwiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="gallery-img AZ-img-container">
                                        <div class="AZ-img-container-inner AZ-img-cover">
                                            <img
                                                src={`${process.env.REACT_APP_FILEMANAGER}${drug?.PicDaroTarkibi}`}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                    <div class="col-lg-12 ">
                        <div
                            className="AZ-section-text product-name mb-3"
                            dangerouslySetInnerHTML={{
                                __html: decodeHtml(drug?.DescDaroTarkibi),
                            }}
                        />
                        <div className="flex px-3 gap-5 flex-col">
                            <ul class="flex items-start gap-3">
                                {tabs.map((tab) => (
                                    <li
                                        onClick={() => setActiveTab(tab.key)}
                                        key={tab.key}
                                        class=""
                                    >
                                        <div
                                            class={`flex items-start justify-start text-[#7E788A] text-sm font-[IRANSans-Regular] ${
                                                tab.key == activeTab
                                                    ? 'border-b-2 pb-1 !text-[#2C1A50] border-[#2C1A50]'
                                                    : ''
                                            }`}
                                        >
                                            {tab.title}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div class=" ">
                                {activeTab === 1 && (
                                    <div id="tab1" class="tabContent">
                                        <ul class="product-details">
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <p> حجم </p>
                                                <span className="flex gap-1 items-center">
                                                    <span>
                                                        {
                                                            drug?.VolumeDaroTarkibi
                                                        }
                                                    </span>
                                                    <span>میلی لیتر</span>
                                                </span>
                                            </li>
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <p> مناسب </p>
                                                <span>
                                                    {drug?.SuitableDaroTarkibi}
                                                </span>
                                            </li>
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <p> فاقد </p>
                                                <span>
                                                    {
                                                        drug?.NotIncludedDaroTarkibi
                                                    }
                                                </span>
                                            </li>
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <p> ویژگی </p>
                                                <span>
                                                    {drug?.SpecDaroTarkibi}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 2 && (
                                    <div id="tab2" class="tabContent">
                                        <ul class="product-details">
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <div
                                                    className="AZ-section-text mb-3"
                                                    dangerouslySetInnerHTML={{
                                                        __html: decodeHtml(
                                                            drug?.ingredientDaroTarkibi
                                                        ),
                                                    }}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 3 && (
                                    <div id="tab3" class="tabContent">
                                        <ul class="product-details">
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <span>
                                                    {drug?.HandyDrugShape}
                                                </span>
                                            </li>
                                            <li class="d-flex align-items-center gap-4 py-2">
                                                <span>
                                                    {drug?.DoseandShape}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 4 && (
                                    <div id="tab4" class="tabContent">
                                        {drug?.ingredientDaroTarkibi && (
                                            <p
                                                className=""
                                                dangerouslySetInnerHTML={{
                                                    __html: decodeHtml(
                                                        drug?.ingredientDaroTarkibi
                                                    ),
                                                }}
                                            ></p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </section>
    )
}
export default ProductById
