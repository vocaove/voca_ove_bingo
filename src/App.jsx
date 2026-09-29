import React, { useState, useEffect } from 'react';
import html2canvas from 'https://esm.sh/html2canvas';
import { ADMIN_PRESET_SONGS } from './songsData';

const STAFF_PIN_CODE = '8839';

const getYouTubeSearchUrl = (title) => {
  if (!title) return 'https://www.youtube.com';
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`;
};

const createEmptyBoard = () => {
  return Array(25).fill(null).map((_, index) => ({
    id: index,
    title: '',
    isFree: index === 12,
    isOpen: index === 12,
  }));
};

export default function BingoApp() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isEditMode, setIsEditMode] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [selectedCell, setSelectedCell] = useState(null);
  
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBingoAchieved, setIsBingoAchieved] = useState(false);
  const [isTicketClaimed, setIsTicketClaimed] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // 💡 Base64形式、JSON形式、旧形式のすべてを確実に復元するパーサー
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const dataParam = params.get('data');

      if (dataParam) {
        let savedTitles = [];
        let success = false;

        // 試行1: Base64デコードを試す（現在のX共有形式）
        try {
          const decodedBinary = atob(dataParam);
          const jsonString = decodeURIComponent(escape(decodedBinary));
          savedTitles = JSON.parse(jsonString);
          if (Array.isArray(savedTitles) && savedTitles.length === 25) {
            success = true;
          }
        } catch (e1) {
          // Base64ではない場合スキップ
        }

        // 試行2: 通常のJSON文字列デコードを試す
        if (!success) {
          try {
            const jsonString = decodeURIComponent(dataParam);
            savedTitles = JSON.parse(jsonString);
            if (Array.isArray(savedTitles) && savedTitles.length === 25) {
              success = true;
            }
          } catch (e2) {
            // JSONではない場合スキップ
          }
        }

        // 試行3: カンマ区切りのインデックス形式を試す（レガシー形式）
        if (!success) {
          try {
            const indices = dataParam.split(',').map(n => parseInt(n, 10));
            savedTitles = indices.map(presetIndex => (presetIndex !== undefined && ADMIN_PRESET_SONGS[presetIndex]) ? ADMIN_PRESET_SONGS[presetIndex].title : '');
            if (savedTitles.length === 25) {
              success = true;
            }
          } catch (e3) {
            // 失敗
          }
        }

        if (success) {
          const newBoard = createEmptyBoard().map((cell, index) => {
            if (cell.isFree) return cell;
            return { ...cell, title: savedTitles[index] || '' };
          });
          setBoard(newBoard);
          setIsEditMode(false);
          setIsReadOnly(true);
          return;
        }
      }

      // 通常のローカルストレージ読み込み
      const savedBoard = localStorage.getItem('vocaOvaBingoBoard_v6');
      const savedMode = localStorage.getItem('vocaOvaBingoMode_v6');
      const savedClaimed = localStorage.getItem('vocaOvaBingoClaimed_v6');
      if (savedBoard) setBoard(JSON.parse(savedBoard));
      if (savedMode) setIsEditMode(JSON.parse(savedMode));
      if (savedClaimed) setIsTicketClaimed(JSON.parse(savedClaimed));

    } catch (e) {
      console.error('データの読み込みに失敗しました', e);
    }
  }, []);

  useEffect(() => {
    if (!isReadOnly) {
      try {
        localStorage.setItem('vocaOvaBingoBoard_v6', JSON.stringify(board));
        localStorage.setItem('vocaOvaBingoMode_v6', JSON.stringify(isEditMode));
        localStorage.setItem('vocaOvaBingoClaimed_v6', JSON.stringify(isTicketClaimed));
      } catch (e) {
        console.error('LocalStorage save error', e);
      }
    }
  }, [board, isEditMode, isTicketClaimed, isReadOnly]);

  const handleSaveCell = () => {
    if (selectedCell === null || isReadOnly) return;
    setBoard(board.map((cell, i) => i === selectedCell ? { ...cell, title: inputTitle.trim() || 'お気に入りの曲' } : cell));
    setInputTitle('');
    setSelectedCell(null);
  };

  const handleAdminAutoFill = () => {
    if (isReadOnly) return;
    const emptyCount = board.filter(cell => !cell.isFree && !cell.title).length;
    if (emptyCount === 0) return window.alert('すべてのマスが埋まっています！');

    const existingTitles = new Set(board.filter(cell => cell.title).map(cell => cell.title));
    const availablePresets = ADMIN_PRESET_SONGS.filter(song => !existingTitles.has(song.title));
    const shuffledPreset = [...availablePresets].sort(() => Math.random() - 0.5);

    let songIndex = 0;
    const newBoard = board.map(cell => {
      if (!cell.isFree && !cell.title && songIndex < shuffledPreset.length) {
        const song = shuffledPreset[songIndex];
        songIndex++;
        return { ...cell, title: song.title };
      }
      return cell;
    });
    setBoard(newBoard);
  };

  const checkBingo = (currentBoard) => {
    const lines = [
      [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
      [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
      [0,6,12,18,24], [4,8,12,16,20]
    ];
    for (let line of lines) {
      if (line.every(index => currentBoard[index].isOpen)) return true;
    }
    return false;
  };

  const handleCellClick = (index) => {
    const cell = board[index];
    if (cell.isFree) return;

    if (isReadOnly) {
      if (cell.title) {
        window.open(getYouTubeSearchUrl(cell.title), '_blank');
      }
      return;
    }

    if (isEditMode) {
      setSelectedCell(index);
      setInputTitle(cell.title);
    } else {
      if (!cell.isOpen) {
        if (window.confirm('この曲が流れましたか？（マスを開けます）')) {
          const newBoard = board.map((c, i) => i === index ? { ...c, isOpen: true } : c);
          setBoard(newBoard);
          if (!isBingoAchieved && checkBingo(newBoard)) {
            setTimeout(() => setIsBingoAchieved(true), 300);
          }
        }
      } else {
        if (window.confirm('マスの開放を取り消しますか？')) {
          setBoard(board.map((c, i) => i === index ? { ...c, isOpen: false } : c));
        }
      }
    }
  };

  // 💡 確実にBase64形式でエンコードしてURLに格納
  const handleConfirmParticipation = async () => {
    const emptyCount = board.filter(cell => !cell.isFree && !cell.title).length;
    if (emptyCount > 0) {
      window.alert(`まだ ${emptyCount} マス空いています！すべてのマスを埋めてください。`);
      return;
    }

    const titles = board.filter(cell => !cell.isFree).map(cell => cell.title);
    const uniqueTitles = new Set(titles);
    if (uniqueTitles.size !== titles.length) {
      window.alert('⚠️ 同じ曲名が重複しているマスがあります！\n別の曲に設定し直してください。');
      return;
    }

    if (!window.confirm('盤面を確定しますか？\n確定後は曲名の変更ができなくなります。')) return;

    setIsEditMode(false);
    setSelectedCell(null);

    const titlesArray = board.map(cell => cell.isFree ? 'FREE' : (cell.title || ''));
    const jsonString = JSON.stringify(titlesArray);
    const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

    const generatedShareableUrl = `${window.location.origin}${window.location.pathname}?data=${base64Data}`;
    setShareUrl(generatedShareableUrl);

    const element = document.getElementById('bingo-board-capture');
    if (element) {
      try {
        const canvas = await html2canvas(element, { useCORS: true, backgroundColor: '#ffffff', scale: 2 });
        setGeneratedImage(canvas.toDataURL('image/png'));
        setShowShareModal(true);
      } catch (err) {
        console.error('画像の生成に失敗しました', err);
        window.alert('画像の生成に失敗しました。シェア画面へ進みます。');
        setShowShareModal(true);
      }
    }
  };

  const handleClaimTicket = () => {
    const input = window.prompt('【スタッフ専用】\n引き換え用の4桁のPINコードを入力してください');
    if (input === STAFF_PIN_CODE) {
      setIsTicketClaimed(true);
      window.alert('ドリンクチケットを引き換えました！');
    } else if (input !== null) {
      window.alert('PINコードが間違っています。');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#333333', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      <h1 style={{ color: '#00bfff', marginBottom: '5px', fontWeight: '900' }}>ボカオバ ビンゴ</h1>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
        {isReadOnly ? '【閲覧モード】タップするとYouTubeで曲を検索できます！' : (isEditMode ? '【セットアップモード】楽曲を予想しよう！' : '【プレイモード】曲が流れたらマスをタップ！')}
      </p>

      <div id="bingo-board-capture" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', width: '100%', maxWidth: '520px', marginBottom: '30px', padding: '10px', backgroundColor: '#ffffff' }}>
        {board.map((cell, index) => (
          <div 
            key={index} onClick={() => handleCellClick(index)}
            style={{
              aspectRatio: '1', borderRadius: '8px',
              border: `2px solid ${cell.isOpen ? '#ff4500' : (selectedCell === index ? '#00bfff' : '#dddddd')}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden',
              boxShadow: cell.isOpen ? '0 0 8px rgba(255, 69, 0, 0.5)' : (selectedCell === index ? '0 0 8px rgba(0, 191, 255, 0.5)' : 'none'),
              backgroundColor: cell.isFree ? '#e0f7fa' : (cell.title ? '#0f172a' : '#f8fafc'),
              padding: '6px', boxSizing: 'border-box'
            }}
          >
            {cell.isOpen && !cell.isFree && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.6)', zIndex: 2 }} />
            )}
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              {cell.isFree && <div style={{ fontWeight: 'bold', color: '#00bfff', fontSize: '14px' }}>FREE</div>}
              {!cell.isFree && !cell.title && <div style={{ fontSize: '11px', color: '#94a3b8' }}>未設定</div>}
              {!cell.isFree && cell.title && (
                <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: 'bold', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', wordBreak: 'break-all' }}>
                  {cell.title}
                </div>
              )}
              {cell.isOpen && !cell.isFree && <div style={{ fontSize: '42px', color: '#ff2a2a', textShadow: '0 0 5px #fff', position: 'absolute', zIndex: 3 }}>〇</div>}
            </div>
          </div>
        ))}
      </div>

      {isBingoAchieved && !isReadOnly && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '20px', backgroundColor: '#fff3e0', border: '2px solid #ff9800', borderRadius: '10px', marginBottom: '30px', textAlign: 'center', boxSizing: 'border-box' }}>
          <h2 style={{ color: '#ff4500', margin: '0 0 10px 0' }}>🎉 BINGO達成!! 🎉</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>おめでとうございます！バーカウンターでこの画面をスタッフに見せてください。</p>
          {isTicketClaimed ? (
             <div style={{ padding: '15px', backgroundColor: '#eeeeee', color: '#999', borderRadius: '5px', fontWeight: 'bold', fontSize: '18px' }}>
               🎟️ 引き換え済み
             </div>
          ) : (
            <button onClick={handleClaimTicket} style={{ width: '100%', padding: '15px', backgroundColor: '#ff9800', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(255, 152, 0, 0.4)' }}>
              🎁 ドリチケを受け取る（スタッフ操作）
            </button>
          )}
        </div>
      )}

      {isEditMode && selectedCell !== null && !board[selectedCell].isFree && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '15px', backgroundColor: '#e0f7fa', border: '1px solid #b2ebf2', borderRadius: '10px', marginBottom: '20px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#00838f' }}>マス {selectedCell + 1} の楽曲を設定</div>
          <input 
            type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="曲名（自由入力OK）"
            style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          <button onClick={handleSaveCell} style={{ width: '100%', padding: '10px', backgroundColor: '#00bfff', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>このマスに保存</button>
        </div>
      )}

      {isEditMode && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '15px', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '10px', marginBottom: '30px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#f57f17' }}>⚡ 運営のおまかせ入力</div>
          <button onClick={handleAdminAutoFill} style={{ width: '100%', padding: '12px', backgroundColor: '#ffb300', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>おまかせで空きマスを埋める！</button>
        </div>
      )}

      {!isReadOnly && (
        isEditMode ? (
          <button onClick={handleConfirmParticipation} style={{ width: '100%', maxWidth: '520px', padding: '15px', backgroundColor: '#00bfff', color: '#ffffff', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 191, 255, 0.4)' }}>
            参加確定してXでシェア
          </button>
        ) : (
          <button onClick={() => { if(window.confirm('編集モードに戻しますか？')) setIsEditMode(true); }} style={{ marginTop: '20px', padding: '10px', background: '#eeeeee', color: '#666', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>編集モードに戻る</button>
        )
      )}

      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', maxWidth: '400px', width: '100%', textAlign: 'center', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#00bfff' }}>盤面完成！</h3>
            <p style={{ fontSize: '13px', color: '#333', marginBottom: '15px' }}>画像を保存し、Xに投稿しよう！</p>
            {generatedImage && (
              <img src={generatedImage} alt="BINGO Board" style={{ width: '100%', borderRadius: '10px', marginBottom: '15px', border: '1px solid #ccc' }} />
            )}
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('私のボカオバ予想ビンゴ！\nイベントでかかる曲を当ててドリチケをもらうぞ💪\n')}&url=${encodeURIComponent(shareUrl)}&hashtags=ボカオバ,ボカオバビンゴ,ボカオバリクエスト`} 
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', backgroundColor: '#000', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '25px', fontWeight: 'bold', marginBottom: '15px' }}
            >
              𝕏 カードをポスト
            </a>
            <button onClick={() => setShowShareModal(false)} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer' }}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}