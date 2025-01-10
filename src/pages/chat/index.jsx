import HandlePreviousPageButton from '../../components/share/HandlePreviousPageButton'
import { useFetchChats } from '../../hooks/chat/useFetchChats'
import ChatCard from '../../components/chat/chatCard'
import BottomNavigation from '../../components/share/BottomNavigation'

export default function Chats() {
    //panel.dorna-uni.ir/api/Doapi?func=Getshowchanel&apikey=4a2e82f3d1ec790edfef25a0895e481fab5ddd8d&show=1

    const { data: chatsData } = useFetchChats()

    return (
        <section className="AZ-page-container font-[IRANSans-Regular]">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                            <h2 class="page-header-title text-center">
                                تالار گفتگو
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
                        <div class="col-lg-12 pl-0"></div>
                        <div>
                            {chatsData &&
                                chatsData.map((item) => (
                                    <ChatCard key={item.id} chat={item} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </section>
    )
}
