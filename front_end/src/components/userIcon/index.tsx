import React,{useEffect, useState,useRef} from "react"
import { Container,UserMenu,UserButton,MenuButton } from "./styles"
import icon from "../../assets/user-white.svg"
import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"

export const UserIcon: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const {signOut} = useAuth();
    const navigate = useNavigate();

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

    const handleSair = () => {
        signOut();
        navigate('/');
    }

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
                    <MenuButton onClick={()=>navigate("/Perfil")}>Perfil</MenuButton>
                    <MenuButton onClick={handleSair}>Sair</MenuButton>
                </UserMenu>
            )}
        </Container>
    );
}
