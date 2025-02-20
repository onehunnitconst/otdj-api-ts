import { User } from '@prisma/client';

export class UserProfileDto {
  id: number;
  user_id: string;
  nickname: string;
  profile_image?: string;

  static fromModel(model: User): UserProfileDto {
    return {
      id: model.id,
      user_id: model.user_id,
      nickname: model.nickname,
      profile_image: model.profile_image,
    };
  }
}
