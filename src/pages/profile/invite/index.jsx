import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Tooltip,
    Link,
} from '@nextui-org/react'
import userIcon from '../../../assets/img/user-invite-friend.png'
import HandlePreviousPageButton from '../../../components/share/HandlePreviousPageButton'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Icon } from '@iconify/react'

const UserInvite = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const user_id = localStorage.getItem('user_id')

    // const handleCopyText = () => {
    //     var copyText = document.getElementById('link')
    //     copyText.select()
    //     copyText.setSelectionRange(0, 99999) // For mobile devices
    //     navigator.clipboard.writeText(copyText.value)
    //     // Alert the copied text
    //     // alert("Copied the text: " + copyText.value);
    // }

    const [disabled, setDisabled] = useState(false)

    const copyToClipboard = () => {
        var copyText = document.getElementById('link')
        if (disabled) return
        setDisabled(true)
        navigator.clipboard.writeText(copyText)
        toast.success('لینک کپی شد')
        setTimeout(() => setDisabled(false), 3000)
    }

    return (
        <section className="AZ-page-container AZ-dashboard-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 py-3">
                        <div className="d-flex align-items-center justify-content-center position-relative py-3">
                            <HandlePreviousPageButton />
                        </div>
                        <h1 className="AZ-section-title">
                            با دعوت از دوستان خود، درنا کوین رایگان بگیرید .
                        </h1>
                        <p className="AZ-section-text">
                            لینک دعوت یا کد معرفی خود را برای دوستانتان ارسال
                            کنید و تا از این طریق هم شما و هم دوستانتان اعتبار
                            رایگان هدیه بگیریر.
                        </p>
                        <div className="d-flex align-items-center gap-2 my-4">
                            <img src={userIcon} alt="" width="100%" />
                        </div>
                        <div className="share-link d-flex align-items-center justify-content-between my-4 gap-3">
                            <span className="copy-text">کد دعوت: </span>
                            <div
                                id="copy"
                                className="copy"
                                onClick={copyToClipboard}
                            >
                                {disabled ? (
                                    <span
                                        className="icon-check"
                                        aria-hidden="true"
                                        data-copytarget="#link"
                                    ></span>
                                ) : (
                                    <span
                                        className="icon-content_copy"
                                        aria-hidden="true"
                                        data-copytarget="#link"
                                    ></span>
                                )}
                            </div>
                            <input
                                id="link"
                                className="link"
                                value={user_id}
                                readOnly
                            />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <>
                                <Button
                                    onPress={onOpen}
                                    className="AZ-primary-btn w-100 justify-content-center align-items-center d-flex"
                                >
                                    دعوت از دوستان
                                </Button>
                                <Modal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                >
                                    <ModalContent className="rounded-b-none rounded-t-md min-h-[70vh] font-[IRANSans-Regular] ">
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1 font-[IRANSans-Regular]">
                                                    اشتراک گذاری لینک دعوت
                                                </ModalHeader>
                                                <ModalBody>
                                                    <a
                                                        onClick={onClose}
                                                        target="_blank"
                                                        data-action="share/whatsapp/share"
                                                        className="AZ-primary-btn w-100 justify-content-center align-items-center d-flex"
                                                        href={`https://whatsapp://send?text=کد دعوت من: ${user_id}`}
                                                    >
                                                        اشتراک گذاری از طریق
                                                        واتساپ
                                                    </a>
                                                    <a
                                                        onClick={onClose}
                                                        target="_blank"
                                                        className="AZ-primary-btn w-100 justify-content-center align-items-center d-flex"
                                                        href={`https://t.me/share/url?url=${`url`}&text=${`کد دعوت من: ${user_id}`}`}
                                                    >
                                                        اشتراک گذاری از طریق
                                                        تلگرام
                                                    </a>
                                                    <button
                                                        onClick={() => {
                                                            onClose()
                                                            copyToClipboard()
                                                        }}
                                                        className="AZ-primary-btn w-100 justify-center flex gap-2 items-center"
                                                    >
                                                        <Icon
                                                            icon="solar:link-minimalistic-2-linear"
                                                            className="w-5 h-5"
                                                        />

                                                        <span>کپی لینک</span>
                                                    </button>
                                                </ModalBody>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default UserInvite
