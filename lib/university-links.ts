export type UniversityLinks = {
  campusMap: string;
  studentPortal: string | null;
  homepage: string | null;
};

export const UNIVERSITY_LINKS: Record<
  string,
  { campusMap: string; studentPortal: string; homepage: string }
> = {
  "Seoul National University": {
    campusMap: "https://map.naver.com/p/search/서울대학교",
    studentPortal: "https://oia.snu.ac.kr/",
    homepage: "https://en.snu.ac.kr/",
  },
  "Yonsei University": {
    campusMap: "https://map.naver.com/p/search/연세대학교",
    studentPortal: "https://oia.yonsei.ac.kr/main/main.php",
    homepage: "https://www.yonsei.ac.kr/en_sc/",
  },
  "Korea University": {
    campusMap: "https://map.naver.com/p/search/고려대학교",
    studentPortal: "https://oia.korea.ac.kr/",
    homepage: "https://www.korea.edu/sites/en/index.do",
  },
  KAIST: {
    campusMap: "https://map.naver.com/p/search/KAIST",
    studentPortal: "https://international.kaist.ac.kr/",
    homepage: "https://www.kaist.ac.kr/en/",
  },
  "Hanyang University": {
    campusMap: "https://map.naver.com/p/search/한양대학교",
    studentPortal: "https://www.hanyang.ac.kr/web/eng",
    homepage: "https://www.hanyang.ac.kr/web/eng",
  },
  "Sogang University": {
    campusMap: "https://map.naver.com/p/search/서강대학교",
    studentPortal: "https://oia.sogang.ac.kr/oiaeng/index.html",
    homepage: "https://www.sogang.ac.kr/en/",
  },
  "Ewha Womans University": {
    campusMap: "https://map.naver.com/p/search/이화여자대학교",
    studentPortal: "https://oia.ewha.ac.kr/oia/index.do",
    homepage: "https://www.ewha.ac.kr/ewhaen/index.do",
  },
  "Sungkyunkwan University": {
    campusMap: "https://map.naver.com/p/search/성균관대학교",
    studentPortal: "https://en.skku.edu/",
    homepage: "https://en.skku.edu/",
  },
  "Kyung Hee University": {
    campusMap: "https://map.naver.com/p/search/경희대학교",
    studentPortal: "https://oia.khu.ac.kr/eng/index.do",
    homepage: "https://www.khu.ac.kr/eng/main/index.do",
  },
};

// Used for "Other" universities not in the map: a Seoul-wide map and
// no portal/homepage links.
const FALLBACK_LINKS: UniversityLinks = {
  campusMap: "https://map.naver.com/p/search/Seoul",
  studentPortal: null,
  homepage: null,
};

export function getUniversityLinks(
  university: string | null | undefined
): UniversityLinks {
  if (university && UNIVERSITY_LINKS[university]) {
    return UNIVERSITY_LINKS[university];
  }
  return FALLBACK_LINKS;
}
