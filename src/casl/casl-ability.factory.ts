import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/enum/action.enum';
import { Role } from 'src/enum/roles.enum';
import { Post as BlogPost } from 'src/post/schemas/post.schema';
import { User } from 'src/user/schemas/user.schema';

type Subjects = InferSubjects<typeof BlogPost | typeof User> | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.roles?.includes(Role.Admin)) {
      can(Action.Manage, 'all');
    }

    if (user.isCreateAble) {
      can(Action.Create, BlogPost);
    }

    can(Action.Update, BlogPost, { createdBy: user._id });

    cannot(Action.Delete, BlogPost, { isPublished: true });

    can(Action.Update, User, { _id: user._id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
