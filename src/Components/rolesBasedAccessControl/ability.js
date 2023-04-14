import { AbilityBuilder, PureAbility } from '@casl/ability';

export default function defineRulesFor(role) {
  const { can, rules } = new AbilityBuilder();

  switch (role) {
    case 'ADMIN':
      can(['admin-dashboard', 'users', 'pool-listing', 'logout'], 'navbar');
      break;

    case 'USER':
      can(['about', 'party', 'how-to-play', 'pool', 'balr-token', 'wallet'], 'navbar');
      break;
    
     default:
        can(['about', 'party', 'how-to-play', 'pool', 'balr-token'], 'navbar');
        break;
  }
  
  return rules;
}

export function buildAbilityFor(role) {
  return new PureAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object) => object.type,
  });
}
