const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {
  findByEmail,
  findByGoogleId,
  createGoogleUser,
  findById,
} = require("../models/users");

module.exports = (passport) => {
  // 로컬 로그인 전략
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await findByEmail(email);
          if (!user) {
            return done(null, false, {
              message: "존재하지 않는 이메일입니다.",
            });
          }

          if (!user.password) {
            console.log("구글 로그인으로 가입된 계정입니다.");
            return done(null, false, {
              message: "구글 로그인으로 가입된 계정입니다.",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, {
              message: "비밀번호가 일치하지 않습니다.",
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // 구글 로그인 전략
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const { id: google_id, emails, photos } = profile;
          let user = await findByGoogleId(google_id);

          if (!user) {
            const email = emails[0].value;
            const username = email.split("@")[0];
            const profile_picture = photos[0].value;

            const existingUser = await findByEmail(email);
            if (existingUser) {
              return done(null, existingUser);
            }

            await createGoogleUser({ username, email, google_id, profile_picture });
            user = await findByGoogleId(google_id);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID, // 카카오톡 개발자 사이트에서 발급받은 Client ID
        callbackURL: process.env.KAKAO_CALLBACK_URL, // 예: http://localhost:5001/auth/kakao/callback
      },
      (_accessToken, _refreshToken, profile, done) => {
        try {
          const email =
            profile._json?.kakao_account?.has_email &&
            profile._json.kakao_account.email;
  
          const user = {
            id: profile.id,
            username: profile.displayName || "카카오 사용자",
            email: email || null, // 없을 수 있음
          };
  
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // 세션에 사용자 ID 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 세션에서 사용자 복원
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
