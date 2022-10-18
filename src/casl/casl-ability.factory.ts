import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/enum/action.enum';
import { Post } from 'src/post/schemas/post.schema';
import { User } from 'src/user/schemas/user.schema';

type Subjects = InferSubjects<typeof Post | typeof User> | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    if (user.roles?.includes('admin')) {
      can(Action.Manage, 'all');
    }
    if (user.isCreatable) {
      can(Action.Create, Post);
    }

    can(Action.Update, Post, { createdBy: user._id });

    cannot(Action.Delete, Post, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
