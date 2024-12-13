-- We want a description field for boulder groups
ALTER TABLE boulder_groups ADD COLUMN description TEXT DEFAULT '';

-- Missing grade 3+
INSERT INTO grades (grade) VALUES ('3+');

-- Populate with boulders and boulder groups per 2024:

INSERT INTO boulder_groups (name, latitude, longitude, description) VALUES
('Steinsetsteinen øvre', 61.7655824, 4.84723, ''),
('Steinsetsteinen midtre', 61.7656521, 4.8472598, ''),
('Steinsetsteinen nedre', 61.7657156, 4.8471998, ''),
('Vikinggraven', 61.7678761, 4.8559535, ''),
('Kjerringhalsen', 61.7717255, 4.8404232, ''),
('Storevågane', 61.7700518, 4.8479468, 'Enkelte buldere her er kun tilgjengelig ved fjære.'),
('Dinosaurveggen', 61.770430, 4.863703, ''),
('Rundt hyttene', 61.7645554, 4.8529644, ''),
('Sørvendt vegg i saueinnhegningen', 61.7646401, 4.8470101, ''),
('Grotlesanden', 61.8429401, 4.900197, 'Enkelte buldere her er kun tilgjengelig ved fjære.');

INSERT INTO boulders (name, grade, start, description, latitude, longitude, image_base_url, image_line_url, boulder_group_id, status) VALUES
-- Steinsetsteinen øvre
('Ørnebu', '6A', 'Ståstart', 'Øvre start i pocket og den øverste av de to crimp-railsene.', 61.765567, 4.8472932, 'bulder_ørnebu.jpg', 'bulder_linje_ørnebu.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen øvre'), 'Besteget'),
('Ørnebu, lav start', '6A+', 'Ståstart', 'nedre start i crimp-rail nedenfor øvre crimp-rail.', 61.765567, 4.8472932, 'bulder_ørnebu_lav.jpg', 'bulder_linje_ørnebu_lav.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen øvre'), 'Besteget'),
('N.N.', '5', 'Ståstart', 'One-move wonder med hard heel hook.', 61.7655615, 4.8472233, 'bulder_hard_heelhook.jpg', 'bulder_linje_hard_heelhook.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen øvre'), 'Besteget'),
('Nordavind', '5+', 'Ståstart', '', 61.765608, 4.8471378, 'bulder_nordavind.jpg', 'bulder_linje_nordavind.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen øvre'), 'Besteget'),
('Quantum Computation & Quantum Information', '5+', 'Ståstart', 'Følger kanten opp til god jug/side pull ca. halvveis opp steinen.', 61.7656123, 4.8472158, 'bulder_quantum_information.jpg', 'bulder_linje_quantum_information.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen øvre'), 'Besteget'),
-- Steinsetsteinen midtre
('N.N', '4', 'Sittstart', '', 61.7656658, 4.8472938, 'bulder_steinsetsteinen_midtre_sitt.jpg', 'bulder_linje_steinsetsteinen_midtre_sitt.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen midtre'), 'Besteget'),
('Oppløsning', '3', 'Ståstart', '', 61.7656332, 4.8472979, 'bulder_oppløsning.jpg', 'bulder_linje_oppløsning.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen midtre'), 'Besteget'),
-- Steinsetsteinen nedre
('Med utsikt til Shetland', '5', 'Ståstart', '', 61.7657175, 4.8470965, 'bulder_shetland.jpg', 'bulder_linje_shetland.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen nedre'), 'Besteget'),
('Samsonhola', '5+', 'Ståstart', '', 61.7656914, 4.8471755, 'bulder_samsonhola.jpg', 'bulder_linje_samsonhola.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen nedre'), 'Besteget'),
('På audiens hos væren', '5+', 'Ståstart', 'Uten steinen under.', 61.7656828, 4.8472246, 'bulder_audiens_hos_væren.jpg', 'bulder_linje_audiens_hos_væren.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen nedre'), 'Besteget'),
('Prosjektet', NULL, 'Ståstart', 'Mangeårig prosjekt', 61.7657011, 4.8473098, 'bulder_prosjekt_1.jpg', 'bulder_linje_prosjekt_1.jpg', (SELECT id FROM boulder_groups WHERE name = 'Steinsetsteinen nedre'), 'Prosjekt'),
-- Vikinggraven
('Vikingsprekken', '3', 'Ståstart', 'Følger den store sprekken.', 61.7678814, 4.8558858, 'bulder_vikingsprekken.jpg', 'bulder_linje_vikingsprekken.jpg', (SELECT id FROM boulder_groups WHERE name = 'Vikinggraven'), 'Besteget'),
('Vikingsprekken SS', '5+', 'Sittstart', 'Følger den store sprekken, sittstart.', 61.7678814, 4.8558858, 'bulder_vikingsprekken.jpg', 'bulder_linje_vikingsprekken.jpg', (SELECT id FROM boulder_groups WHERE name = 'Vikinggraven'), 'Besteget'),
('Vikingsprekken Høyre', '5+', 'Sittstart', 'Følger den mindre sprekken mot høyre.', 61.7678814, 4.8558858, 'bulder_vikingsprekken.jpg', 'bulder_linje_vikingsprekken.jpg', (SELECT id FROM boulder_groups WHERE name = 'Vikinggraven'), 'Besteget'),
-- Kjerringhalsen
('Panorama', '4', 'Ståstart', 'Opp venstre.', 61.771696, 4.842163, 'bulder_panorama.jpg', 'bulder_linje_panorama.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Panorama SS', '4+', 'Sittstart', 'Opp venstre.', 61.771696, 4.842163, 'bulder_panorama.jpg', 'bulder_linje_panorama_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Fyret', '4', 'Ståstart', 'Opp høyre.', 61.771696, 4.842163, 'bulder_panorama.jpg', 'bulder_linje_fyret.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Fyret SS', '4+', 'Sittstart', 'Opp høyre.', 61.771696, 4.842163, 'bulder_panorama.jpg', 'bulder_linje_fyret_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Minnet', '3', 'Ståstart', 'Start helt nede høyre og avslutt rett opp.', 61.771728, 4.842271, 'bulder_minnet.jpg', 'bulder_linje_minnet.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Minnet SS', '4', 'Sittstart', 'Start helt nede høyre og avslutt rett opp.', 61.771728, 4.842271, 'bulder_minnet.jpg', 'bulder_linje_minnet_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Utsikten', '3', 'Ståstart', 'Start helt nede høyre og avslutt til venstre.', 61.771728, 4.842271, 'bulder_minnet.jpg', 'bulder_linje_utsikten.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
('Utsikten SS', '4', 'Sittstart', 'Start helt nede høyre og avslutt til venstre.', 61.771728, 4.842271, 'bulder_minnet.jpg', 'bulder_linje_utsikten_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Kjerringhalsen'), 'Besteget'),
-- Storevågane
('N.N.', '3+', 'Ståstart', 'Opp venstre.', 61.7699707, 4.8480077, 'bulder_storevågane_1.jpg', 'bulder_linje_storevågane_1.jpg', (SELECT id FROM boulder_groups WHERE name = 'Storevågane'), 'Besteget'),
('Skuld', '3+', 'Ståstart', 'Opp høyre.', 61.7699707, 4.8480077, 'bulder_skuld.jpg', 'bulder_linje_skuld.jpg', (SELECT id FROM boulder_groups WHERE name = 'Storevågane'), 'Besteget'),
('Sandflyndre', '5+', 'Ståstart', 'Følg kanten og topp ut rett opp. Hold kroppen på venstresiden av kanten.', 61.7699568, 4.8480097, 'bulder_sandflyndre.jpg', 'bulder_linje_sandflyndre.jpg', (SELECT id FROM boulder_groups WHERE name = 'Storevågane'), 'Besteget'),
('Sandflyndre SS', '6A', 'Sittstart', 'Følg kanten og topp ut rett opp. Hold kroppen på venstresiden av kanten.', 61.7699568, 4.8480097, 'bulder_sandflyndre.jpg', 'bulder_linje_sandflyndre_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Storevågane'), 'Besteget'),
('Rødspette', '6A', 'Ståstart', 'Start nede på høyrekanten og traverser til venstre. Topp ut på venstresiden. Muligheter for sittstart. Kun tilgjengelig ved fjære.', 61.7699568, 4.8480097, 'bulder_sandflyndre.jpg', 'bulder_linje_rødspette.jpg', (SELECT id FROM boulder_groups WHERE name = 'Storevågane'), 'Besteget'),
('Piggskate', '5+', 'Sittstart', '', 61.770005, 4.8479719, 'bulder_sandflyndre.jpg', 'bulder_linje_rødspette.jpg', (SELECT id FROM boulder_groups WHERE name = 'Storevågane'), 'Besteget'),
-- Dinosaurveggen
('Halibutosaurus Rex', '5', 'Ståstart', 'Uten venstre kant', 61.770430, 4.863703, 'bulder_halibutosaurus.jpg', 'bulder_linje_halibutosauru.jpg', (SELECT id FROM boulder_groups WHERE name = 'Dinosaurveggen'), 'Besteget'),
-- Rundt hyttene
('Et nytt kapittel', '4', 'Ståstart', 'Steinsets første bulder!', NULL, NULL, 'bulder_nytt_kapittel.jpg', 'bulder_linje_nytt_kapittel.jpg', (SELECT id FROM boulder_groups WHERE name = 'Rundt hyttene'), 'Besteget'),
('Nøkkelhullet', '3', 'Ståstart', '', NULL, NULL, 'bulder_nøkkelhullet.jpg', 'bulder_linje_nøkkelhullet.jpg', (SELECT id FROM boulder_groups WHERE name = 'Rundt hyttene'), 'Besteget'),
('Nøkkelhullet SS', '4', 'Sittstart', '', NULL, NULL, 'bulder_nøkkelhullet.jpg', 'bulder_linje_nøkkelhullet_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Rundt hyttene'), 'Besteget'),
('Elektrisk gjerde', '3', 'Ståstart', '', NULL, NULL, 'bulder_elektrisk_gjerde.jpg', 'bulder_linje_elektrisk_gjerde.jpg', (SELECT id FROM boulder_groups WHERE name = 'Rundt hyttene'), 'Besteget'),
('Elektrisk gjerde SS', '4+', 'Ståstart', '', NULL, NULL, 'bulder_elektrisk_gjerde.jpg', 'bulder_linje_elektrisk_gjerde_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Rundt hyttene'), 'Besteget'),
('Badestamp', '4+', 'Sittstart', 'Uten steinen under.', NULL, NULL, 'bulder_badestamp.jpg', 'bulder_linje_badestamp.jpg', (SELECT id FROM boulder_groups WHERE name = 'Rundt hyttene'), 'Besteget'),
-- Sørvendt vegg i saueinnhegningen
('Edderkoppens hule', '4', 'Sittstart', 'Svær edderkopp bor i første fottak.', NULL, NULL, 'bulder_edderkoppens_hule.jpg', 'bulder_linje_edderkoppens_hule.jpg', (SELECT id FROM boulder_groups WHERE name = 'Sørvendt vegg i saueinnhegningen'), 'Besteget'),
('Saueull', '4', 'Sittstart', 'Sittstart. Kanskje muligheter for en direkte dynovariant', NULL, NULL, 'bulder_saueull.jpg', 'bulder_linje_saueull.jpg', (SELECT id FROM boulder_groups WHERE name = 'Sørvendt vegg i saueinnhegningen'), 'Besteget'),
-- Grotlesanden
('N.N.', '4', 'Ståstart', '', 61.843283, 4.9000403, 'bulder_grotlesanden_1.jpg', 'bulder_linje_grotlesanden_1.jpg', (SELECT id FROM boulder_groups WHERE name = 'Grotlesanden'), 'Besteget'),
('N.N.', '6A', 'Sittstart', '', 61.843283, 4.9000403, 'bulder_grotlesanden_1.jpg', 'bulder_linje_grotlesanden_1_ss.jpg', (SELECT id FROM boulder_groups WHERE name = 'Grotlesanden'), 'Besteget'),
('N.N.', '5', 'Ståstart', 'Uten venstre kant.', 61.8433074, 4.900031, 'bulder_grotlesanden_2.jpg', 'bulder_linje_grotlesanden_2v.jpg', (SELECT id FROM boulder_groups WHERE name = 'Grotlesanden'), 'Besteget'),
('N.N.', '5', 'Ståstart', 'Start med høyre hånd i sprekken og følg sprekken oppover.', 61.8433074, 4.900031, 'bulder_grotlesanden_2.jpg', 'bulder_linje_grotlesanden_2h.jpg', (SELECT id FROM boulder_groups WHERE name = 'Grotlesanden'), 'Besteget'),
('N.N.', '6A', 'Ståstart', '', 61.843308, 4.9000053, 'bulder_grotlesanden_3.jpg', 'bulder_linje_grotlesanden_3.jpg', (SELECT id FROM boulder_groups WHERE name = 'Grotlesanden'), 'Besteget');