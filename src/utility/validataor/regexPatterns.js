const regexPatterns = {
  EMPTY_STRING: {
    regex: /^$/,
    description: '[문자열] 빈 문자열 여부 확인',
  },
  NON_EMPTY_STRING: {
    regex: /\S+/,
    description: '[문자열] 공백 제외 최소 1자 이상',
  },
  ALPHABETS_ONLY: {
    regex: /^[a-zA-Z]+$/,
    description: '[문자열] 영문 알파벳만 포함',
  },
  ALPHANUMERIC: {
    regex: /^[a-zA-Z0-9]+$/,
    description: '[문자열] 영문과 숫자만 포함',
  },
  CONTAINS_SPECIAL_CHAR: {
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    description: '[문자열] 특수 문자 포함 여부 확인',
  },
  INTEGER: {
    regex: /^-?\d+$/,
    description: '[숫자] 정수만 포함',
  },
  POSITIVE_INTEGER: {
    regex: /^\d+$/,
    description: '[숫자] 양의 정수 확인',
  },
  NEGATIVE_INTEGER: {
    regex: /^-\d+$/,
    description: '[숫자] 음의 정수 확인',
  },
  FLOAT: {
    regex: /^-?\d+(\.\d+)?$/,
    description: '[숫자] 소수 포함 숫자 확인',
  },
  RANGE_0_TO_100: {
    regex: /^(100|[1-9]?\d)$/,
    description: '[숫자] 0부터 100 사이의 숫자',
  },
  EMAIL: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    description: '[이메일] 이메일 형식 확인',
  },
  URL: {
    regex: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
    description: '[URL] 웹 주소 형식 확인 (http, https 지원)',
  },
  DOMAIN: {
    regex: /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
    description: '[도메인] 도메인 주소 확인',
  },
  KOREAN_PHONE: {
    regex: /^01[016789]-\d{3,4}-\d{4}$/,
    description: '[전화번호] 한국 휴대전화 번호 형식 (010-1234-5678)',
  },
  INTERNATIONAL_PHONE: {
    regex: /^\+\d{1,3} \d{1,4} \d{3,4} \d{4}$/,
    description: '[전화번호] 국제 전화번호 형식 (+82 10 1234 5678)',
  },
  PHONE_NUMBERS_ONLY: {
    regex: /^\d{10,11}$/,
    description: '[전화번호] 숫자만 포함한 전화번호',
  },
  DATE_YYYY_MM_DD: {
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    description: '[날짜] YYYY-MM-DD 형식 확인',
  },
  DATE_MM_DD_YYYY: {
    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
    description: '[날짜] MM/DD/YYYY 형식 확인',
  },
  TIME_24H: {
    regex: /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
    description: '[시간] 24시간 형식 (HH:mm)',
  },
  TIME_12H: {
    regex: /^(0[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i,
    description: '[시간] 12시간 형식 (hh:mm AM/PM)',
  },
  PASSWORD_STRONG: {
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    description:
      '[비밀번호] 강력한 비밀번호 (8자 이상, 대소문자, 숫자, 특수문자 포함)',
  },
  PASSWORD_MEDIUM: {
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
    description:
      '[비밀번호] 중간 수준 비밀번호 (6자 이상, 대소문자, 숫자 포함)',
  },
  PASSWORD_SIMPLE: {
    regex: /^[a-zA-Z0-9]{6,}$/,
    description: '[비밀번호] 간단한 비밀번호 (특수문자 제외)',
  },
  FOUR_DIGIT_PIN: {
    regex: /^\d{4}$/,
    description: '[PIN] 4자리 숫자 PIN',
  },
  LENGTH_1_TO_20: {
    regex: /^.{1,20}$/,
    description: '[문자열] 1~20자 길이 제한',
  },
  KOREAN_ONLY: {
    regex: /^[가-힣]+$/,
    description: '[문자열] 한글만 포함',
  },
  ENGLISH_WITH_SPACE: {
    regex: /^[a-zA-Z\s]+$/,
    description: '[문자열] 영문과 공백만 포함',
  },
  NUMBERS_AND_SPECIALS: {
    regex: /^[0-9!@#$%^&*(),.?":{}|<>]+$/,
    description: '[문자열] 숫자와 특수 문자만 포함',
  },
  IMAGE_FILE: {
    regex: /\.(jpg|jpeg|png|gif)$/i,
    description: '[파일] 이미지 파일 확장자 (jpg, png 등)',
  },
  JSON_FILE: {
    regex: /\.json$/i,
    description: '[파일] JSON 파일 확장자',
  },
  FILE_PATH: {
    regex: /^([a-zA-Z]:\\|\/)?([\w.-]+[\\/])*[\w.-]+$/,
    description: '[파일] 파일 경로 (Windows/Linux)',
  },
  HTML_TAG: {
    regex: /<("[^"]*"|'[^']*'|[^'">])*>/,
    description: '[HTML] HTML 태그 감지',
  },
  IPV4: {
    regex:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    description: '[네트워크] IPv4 주소 형식 확인',
  },
  HEX: {
    regex: /^[0-9a-fA-F]+$/,
    description: '[숫자] 16진수 값 확인',
  },
  BINARY: {
    regex: /^[01]+$/,
    description: '[숫자] 2진수 값 확인',
  },
};

export default regexPatterns;
