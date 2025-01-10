import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const BottomNavigation = () => {
    const location = useLocation()

    const [activeIndex, setActiveIndex] = useState(() => {
        const active = localStorage.getItem('bottom_link')
        return active ? parseInt(active, 10) : 3
    })

    const sliderRef = useRef(null)
    const linksRef = useRef([])

    useEffect(() => {
        const updateSliderPosition = () => {
            if (sliderRef.current && linksRef.current[activeIndex]) {
                const position =
                    linksRef.current[activeIndex].getBoundingClientRect()
                const margin = 35
                sliderRef.current.style.left = `${position.left + margin}px`
            }
        }
        updateSliderPosition()
    }, [activeIndex])

    const routes = [
        {
            key: 1,
            url: '/chat',
            icon: 'mail',
        },
        {
            key: 2,
            url: '/notification',
            icon: 'bell',
        },
        {
            key: 3,
            url: '/home',
            icon: 'home',
        },
        {
            key: 4,
            url: '/profile',
            icon: 'account2',
        },
        {
            key: 5,
            url: '/prescription',
            icon: 'medical-bottle-svgrepo-com',
        },
    ]

    return (
        <div className="bottom-navber px-3">
            <div className="slider"></div>
            <ul className="d-flex align-items-start justify-content-evenly">
                {routes.map((item) => (
                    <li key={item.key}>
                        <a
                            href={item.url}
                            className={`sc-menu-item AZ-img-container d-flex align-items-center justify-content-center ${
                                location.pathname.includes(item.url)
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <div className="AZ-img-container-inner">
                                <span className={`icon-${item.icon}`}></span>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BottomNavigation
