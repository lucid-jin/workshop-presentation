// 팀 데이터 관리
const teamsData = [
    {
        id: 'team1',
        name: '조 1. 높은 기준',
        members: ['강준호', '권동호', '권소희', '박찬혜', '김기욱'],
        image: './assets/team1.jpg' // 로컬 이미지 경로 또는 공개 URL 사용
    },
    {
        id: 'team2',
        name: '조 2. 빠른 판단과 실행',
        members: ['김상엽', '김태형', '김지영', '김지현'],
        image: './assets/team2.jpg' // team2.jpg 파일을 assets 폴더에 넣으세요
    },
    {
        id: 'team3',
        name: '조 3. 따듯한 팀워크',
        members: ['김기욱', '채재민', '이나은', '박석류', '황수영'],
        image: './assets/team3.jpg' // team3.jpg 파일을 assets 폴더에 넣으세요
    },
    {
        id: 'team4',
        name: '조 4. 고객과 함께하는 팀',
        members: ['방은영', '심은철', '이준모', '이재규'],
        image: './assets/team4.jpg' // team4.jpg 파일을 assets 폴더에 넣으세요
    },
    {
        id: 'team5',
        name: '조 5. 끊임없는 성장',
        members: ['이주현', '최나영', '최우혁', '노성균'],
        image: './assets/team5.jpg' // team5.jpg 파일을 assets 폴더에 넣으세요
    },
    {
        id: 'team6',
        name: '조 6. 주도적인 태도',
        members: ['티모시', '한세희', '방은영', '김가람', '유예지'],
        image: './assets/team6.jpg' // team6.jpg 파일을 assets 폴더에 넣으세요
    }
];

// 팀 카드 동적 생성
function generateTeamCards() {
    const teamsGrid = document.querySelector('.teams-grid');
    if (!teamsGrid) return;

    teamsGrid.innerHTML = '';

    teamsData.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.onclick = () => openTeamModal(team.id, team.image);

        const memberCount = team.members.length;
        const membersHTML = team.members.join(', ');

        teamCard.innerHTML = `
            <div class="team-name">${team.name} (${memberCount}명)</div>
            <div class="team-members">${membersHTML}</div>
        `;

        teamsGrid.appendChild(teamCard);
    });
}

// DOM이 로드되면 팀 카드 생성
document.addEventListener('DOMContentLoaded', function() {
    generateTeamCards();
});

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;


document.getElementById('totalSlides').textContent = totalSlides;

// 슬라이드 관련 함수들
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    document.getElementById('currentSlide').textContent = index + 1;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 전체화면 상태 변화 감지
document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
        document.body.classList.add('fullscreen-mode');
        document.getElementById('fullscreenHint').classList.add('show');
    } else {
        document.body.classList.remove('fullscreen-mode');
        document.getElementById('fullscreenHint').classList.remove('show');
    }
});


// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    } else if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});

// 준비물 공개 기능
function revealMaterial(element) {
    element.classList.remove('blurred');
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

function revealMaterials() {
    const materials = document.querySelectorAll('.material-item.blurred');
    const button = document.querySelector('.reveal-materials-btn');

    materials.forEach((material, index) => {
        setTimeout(() => {
            material.classList.remove('blurred');
            material.style.transform = 'scale(1.1)';
            setTimeout(() => {
                material.style.transform = 'scale(1)';
            }, 200);
        }, index * 150);
    });

    setTimeout(() => {
        button.classList.add('hidden');
    }, materials.length * 150 + 500);
}

// 팀 모달 기능
function openTeamModal(teamId, imageUrl) {
    console.log('Opening modal for:', teamId, imageUrl);
    const modal = document.getElementById(
        'teamModal');
    const teamImage = document.getElementById('teamImage');

    if (!modal || !teamImage) {
        console.error('Modal elements not found');
        return;
    }

    teamImage.src = imageUrl;
    modal.classList.add('show');
}

function closeTeamModal() {
    console.log('Closing modal');
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// 모달 외부 클릭 시 닫기
document.getElementById('teamModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeTeamModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('teamModal').classList.contains('show')) {
        closeTeamModal();
    }
});

// YouTube 플레이어 설정
let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'n4jREd4CVIE',
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'n4jREd4CVIE'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // 플레이어 준비 완료
    console.log('YouTube player ready');
    player.setVolume(30); // 볼륨 30%로 설정
}

function onPlayerStateChange(event) {
    const button = document.querySelector('.music-toggle');
    const icon = document.getElementById('musicIcon');
    const status = document.getElementById('musicStatus');

    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        button.classList.add('playing');
        icon.textContent = '⏸️';
        status.textContent = '일시정지';
    } else {
        isPlaying = false;
        button.classList.remove('playing');
        icon.textContent = '🎵';
        status.textContent = '재생';
    }
}

function toggleMusic() {
    if (!player) return;

    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// 볼륨 조절 함수
function changeVolume(value) {
    if (!player) return;

    player.setVolume(value);
    document.getElementById('volumeValue').textContent = value + '%';

    // 볼륨 아이콘 변경
    const volumeIcon = document.querySelector('.volume-icon');
    if (value == 0) {
        volumeIcon.textContent = '🔇';
    } else if (value < 30) {
        volumeIcon.textContent = '🔈';
    } else if (value < 70) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
}
