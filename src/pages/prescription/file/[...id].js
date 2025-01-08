import { useParams, useSearchParams } from 'react-router-dom'
// import fileRxIcon from "../../../assets/img/file-rx.png";
import fileRxIcon from '../../../assets/img/Rx.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BottomNavigation from '../../../components/share/BottomNavigation'
import HandlePreviousPageButton from '../../../components/share/HandlePreviousPageButton'
import { decodeHtml } from '../../projects/[...id]'

const FileId = () => {
    const [list, setList] = useState([])
    const [tab, setTab] = useState(1)
    const [diseaseName, setDiseaseName] = useState('')
    const [specdoctor, setSpecdoctor] = useState('')
    const { id } = useParams()
    const [drugs, setDrugs] = useState([])
    const [search] = useSearchParams()
    const getDrugs = async () => {
        axios
            .get(
                `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=Getprescriptionfordrug&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`
            )
            .then(function (response) {
                console.log('getDrugs', response.data)

                if (response?.data?.length > 0) {
                    setDrugs(() => response.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log('list', list)

    const getAllDiseaseNames = async () => {
        axios
            .get(
                `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetPrecribtionById&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`
            )
            .then(function (response) {
                if (response?.data?.length > 0) {
                    console.log('response', response.data)

                    let rawData = [...response.data]
                    setList(() => response.data?.splice(0, 1))

                    if (rawData[0].specdoctor) {
                        setSpecdoctor(rawData[0].specdoctor)
                    }

                    if (rawData[0].DiseseName) {
                        setDiseaseName(rawData[0].DiseseName)
                    } else {
                        if (search.get('diseaseName')) {
                            setDiseaseName(search.get('diseaseName'))
                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const loadPage = async () => {
        await getAllDiseaseNames()
        setTimeout(async () => {
            await getDrugs()
        }, 500)
    }
    useEffect(() => {
        loadPage()
    }, [])

    const handleSetTab = (t) => () => {
        setTab((prev) => t)
    }

    console.log('drugs,', drugs)
    return (
        <>
            <section className="AZ-page-container AZ-file-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                                {/* <h1 className="page-header-title text-center" style={{ fontFamily: 'Nastaliq', fontSize: 'xx-large' }}>{list.length > 0 && list[0].DiseseName}</h1> */}

                                <HandlePreviousPageButton />
                            </div>
                            <div className="row mb-3">
                                <div className="col-7 d-flex align-items-center  ">
                                    <div className="flex flex-col font-[b-nazanin] gap-3">
                                        {/*  <h1 className="file-title">
                                            بیمار:
                                    {list && list.length > 0 && list[0].Sex ? list[0].Sex + "ی" : "---"}
                                    &nbsp;

                                    {list && list.length > 0 && list[0].PaitentAge ? list[0].PaitentAge + "ساله" : "---"}
                                    &nbsp;
                                            تشخیص : &nbsp;
                                            {list &&
                                            list.length > 0 &&
                                            list[0].onvan
                                                ? list[0].onvan
                                                : '---'}
                                        </h1> */}
                                        <h1 className="font-[Nastaliq] text-3xl">
                                            نسخ {diseaseName}
                                        </h1>
                                        <div className="flex gap-0 flex-col">
                                            <p>تخصص پزشک:</p>
                                            <p>{specdoctor}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto ms-auto">
                                    <img
                                        src={fileRxIcon}
                                        alt=""
                                        width="78"
                                        height="78"
                                    />
                                </div>
                            </div>
                            <ul className="file-list ltr mb-4">
                                {drugs?.map((f, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="file-details-text"
                                        >
                                            <div className="flex flex-col gap-2 text-[#373636]">
                                                <div className="flex gap-1">
                                                    <span className="font-[BaiJamjuree] font-semibold">
                                                        {f.DrugName ?? ''}
                                                    </span>
                                                    <span className="flex gap-2">
                                                        <span className="bg-[#fffc77] rounded-sm px-1">
                                                            {f.Dose && f.Dose}
                                                        </span>
                                                        <span className="bg-[#fffc77] rounded-sm px-1">
                                                            N=
                                                            {f.Dose && f.number}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="p-2 py-1 rounded-md bg-stone-100">
                                                        {f.frequency &&
                                                            f.frequency}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* <span> {f.Rout && f.Rout}</span>
                                    <div>
                                        <span> {f.frequency}</span>
                                    </div>
                                    <div>
                                        <span> {f.DrugStatus && f.DrugStatus}</span>
                                    </div> */}
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="AZ-tabs-wrapper !text-[#373636] d-flex align-items-center gap-3 mb-4">
                                <ul className="flex justify-start items-center gap-[19px] overflow-x-hidden">
                                    <li className="w-full">
                                        <div
                                            className={`d-flex align-items-center justify-content-center flex-column${
                                                tab === 1
                                                    ? ' border-b-2 border-[#4734f3] !text-[#373636]'
                                                    : ''
                                            }`}
                                        >
                                            <span
                                                onClick={handleSetTab(1)}
                                                className="tab-link d-flex align-items-center justify-content-center flex-column"
                                            >
                                                تشخیص
                                            </span>
                                        </div>
                                    </li>

                                    <li className="w-full">
                                        <div
                                            className={`d-flex align-items-center justify-content-center flex-column${
                                                tab === 2
                                                    ? ' border-b-2 border-[#4734f3] !text-[#373636]'
                                                    : ''
                                            }`}
                                        >
                                            <span
                                                onClick={handleSetTab(2)}
                                                className="tab-link d-flex align-items-center justify-content-center flex-column"
                                            >
                                                خطاهای دارویی
                                            </span>
                                        </div>
                                    </li>
                                    <li className="w-full">
                                        <div
                                            className={`d-flex align-items-center justify-content-center flex-column${
                                                tab === 3
                                                    ? ' border-b-2 border-[#4734f3] !text-[#373636]'
                                                    : ''
                                            }`}
                                        >
                                            <span
                                                onClick={handleSetTab(3)}
                                                className="tab-link d-flex align-items-center justify-content-center flex-column"
                                            >
                                                نکات کلی
                                            </span>
                                        </div>
                                    </li>
                                    <li className="w-full">
                                        <div
                                            className={`d-flex align-items-center justify-content-center flex-column${
                                                tab === 4
                                                    ? ' border-b-2 border-[#4734f3] !text-[#373636]'
                                                    : ''
                                            }`}
                                        >
                                            <span
                                                onClick={handleSetTab(4)}
                                                className="tab-link d-flex align-items-center justify-content-center flex-column"
                                            >
                                                لینک های مفید
                                            </span>
                                        </div>
                                    </li>

                                    {/* <li className={`d-flex align-items-center justify-content-center flex-column${tab === 5 ? ' active' : ''}`}>
                                    <span onClick={handleSetTab(5)}
                                        className="tab-link d-flex align-items-center justify-content-center flex-column">نکات خاص</span>
                                </li> */}
                                </ul>
                            </div>
                            <div className="tabContainer file-tabContainer">
                                {tab === 1 && (
                                    <div id="tab1" className="">
                                        {list?.map((f, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="AZ-box !bg-[#39ffb7]/60 !rounded-sm"
                                                >
                                                    <div
                                                        className="box-text"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeHtml(
                                                                f.distinguish
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {tab === 2 && (
                                    <div id="tab2" className="tabContent">
                                        {list?.map((f, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="AZ-box !bg-[#39ffb7]/60 !rounded-sm"
                                                >
                                                    <div
                                                        className="box-text"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeHtml(
                                                                f.Consiquences
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {tab === 3 && (
                                    <div id="tab3" className="tabContent">
                                        {/* {list?.map((f, i) => {
                                    return <div key={i} className="AZ-box">
                                        <p className="box-text">{f.OnvanTosiehMasraf}</p>
                                        <div className="box-text"
                                            dangerouslySetInnerHTML={{ __html: decodeHtml(f.TosiehMasraf) }} />
                                    </div>;
                                })} */}
                                        {list?.map((f, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="AZ-box !bg-[#39ffb7]/60 !rounded-sm"
                                                >
                                                    <div
                                                        className="box-text"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeHtml(
                                                                f.TosiehMasraf
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {tab === 4 && (
                                    <div id="tab4" className="tabContent">
                                        {list?.map((f, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="AZ-box !bg-[#39ffb7]/60 !rounded-sm"
                                                >
                                                    <div
                                                        className="box-text"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeHtml(
                                                                f.Negahmatn
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {tab === 5 && (
                                    <div id="tab5" className="tabContent">
                                        {list?.map((f, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="AZ-box bg-red-700"
                                                >
                                                    <p className="box-text">
                                                        {f.onvannokatkhas}
                                                    </p>
                                                    <div
                                                        className="box-text"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeHtml(
                                                                f.nokatkhas
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavigation />
            </section>
        </>
    )
}
export default FileId
