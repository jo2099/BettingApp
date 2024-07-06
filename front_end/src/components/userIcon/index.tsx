import React,{useEffect, useState,useRef} from "react"
import { Container,UserMenu,UserButton,MenuButton } from "./styles"
import icon from "../../assets/user-white.svg"
import { useAuth } from "../../hooks/auth"

export const UserIcon: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const {signOut} = useAuth();

    const handleMenu = (event:React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        function handleClickOutside(event:MouseEvent){
            if(menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)){
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[]);

    return (
        <Container> 
            <UserButton ref={buttonRef} onClick={handleMenu}>
                <img src={icon} alt
                ="User"
                width='40px'
                height= '40px' />
            </UserButton>
            {isMenuOpen && (
                <UserMenu ref={menuRef}>
                    <MenuButton>Perfil</MenuButton>
                    <MenuButton onClick={signOut}>Sair</MenuButton>
                </UserMenu>
            )}
        </Container>
    );
}
