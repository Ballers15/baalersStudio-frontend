import { AbilityBuilder, PureAbility } from '@casl/ability';

/**
 * Role based ability provider
 * @param role String | user role
 * @returns 
 */
export default function defineRulesFor(role) {
  const { can, rules } = new AbilityBuilder();

  switch (role) {
    case 'ADMIN':
      can(['admin-dashboard', 'users', 'pool-listing', 'logout'], 'navbar');
      break;

    case 'USER':
      can(['about', 'party', 'how-to-play', 'pool', 'balr-token', 'wallet'], 'navbar');
      can(['redeem now','connect wallet'], 'redeem-btn');
      break;
    
     default:
      can(['about', 'party', 'how-to-play', 'pool', 'balr-token'], 'navbar');
      can(['login'], 'redeem-btn');
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
