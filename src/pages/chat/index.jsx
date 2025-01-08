import HandlePreviousPageButton from '../../components/share/HandlePreviousPageButton'
import { useGetTasks } from '../../hooks/chat/useFetchChats'

export default function Chats() {
    //panel.dorna-uni.ir/api/Doapi?func=Getshowchanel&apikey=4a2e82f3d1ec790edfef25a0895e481fab5ddd8d&show=1

    const { data } = useGetTasks()

    console.log(data)
    return (
        <section className="AZ-page-container">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="d-flex align-items-center justify-content-center position-relative py-3 mb-4">
                            <h2 class="page-header-title text-center">
                                تالار گفتگو
                            </h2>
                            <HandlePreviousPageButton />
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
