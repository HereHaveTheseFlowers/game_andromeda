import { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Game } from './core';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import './game.css';

export default function GamePage() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);
  const [activePauseMenu, setActivePauseMenu] = useState(false);
  const navigate = useNavigate();

  const setActivePauseMenuMutated = (newValue: boolean) => {
    if (newValue) {
      game.current?.pause();
    } else {
      game.current?.unpause();
    }
    setActivePauseMenu(newValue);
  };

  const handleOpenPauseMenu = () => {
    setActivePauseMenuMutated(true);
  };

  const handleClosePauseMenu = () => {
    setActivePauseMenuMutated(false);
  };

  const navigateHome = () => {
    navigate(RouterList.HOME);
  };

  const navigateForums = () => {
    navigate(RouterList.FORUM);
  };

  const navigateLeaderboard = () => {
    navigate(RouterList.LEADER_BOARD);
  };

  document.body.addEventListener('keydown', () => {
    handleOpenPauseMenu();
  });

  useLayoutEffect(() => {
    if (canvas?.current) {
      game.current = new Game({ canvas: canvas.current });
      game.current?.init();
    }
    return () => game?.current?.unmount();
  }, [canvas]);

  return (
    <>
      <canvas className='canvas' ref={canvas}></canvas>
      <Button></Button>
      <Button className='canvas__menu-button' onClick={handleOpenPauseMenu}>
        Menu
      </Button>
      <Modal active={activePauseMenu} setActive={setActivePauseMenuMutated}>
        <Button onClick={handleClosePauseMenu}>Resume</Button>
        <Button onClick={navigateForums}>Forums</Button>
        <Button onClick={navigateLeaderboard}>Leaderboard</Button>
        <Button onClick={navigateHome}>Back to Menu</Button>
      </Modal>
    </>
  );
}
