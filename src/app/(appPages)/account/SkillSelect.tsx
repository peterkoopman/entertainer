'use client';

import { Skill } from './page';
import { fetchAllSkills } from './actions';
import { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface SkillSelectProps {
  selectedSkills: Skill[] | null;
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[] | null>>;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

const SkillSelect = ({
  selectedSkills,
  setSelectedSkills,
  setIsDirty,
}: SkillSelectProps) => {
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [selectedSkillNames, setSelectedSkillNames] = useState<string[]>(
    (selectedSkills?.map((skill) => skill.name).filter(Boolean) as string[]) ||
      []
  );
  // Load all available skills for the skillset select field
  useEffect(() => {
    console.log(selectedSkillNames);
    const loadSkills = async () => {
      const data = await fetchAllSkills();
      setAvailableSkills(data || []);
    };
    loadSkills();
  }, []);

  // Update the parent component's state and trigger the dirty flag
  // whenever the selected skills change.
  useEffect(() => {
    const checkedSkills = selectedSkillNames
      .map((skillName) => availableSkills.find((s) => s.name === skillName))
      .filter(Boolean) as Skill[];

    setSelectedSkills(
      checkedSkills.length > 0 ? (checkedSkills as Skill[]) : null
    );
  }, [selectedSkillNames, availableSkills, setSelectedSkills]);

  const handleSkillSelect = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newNames = typeof value === 'string' ? value.split(',') : value;
    setSelectedSkillNames(newNames);
    setIsDirty(true);
  };

  return (
    <FormControl sx={{ mt: 2, mb: 2, width: '100%' }}>
      <InputLabel id="multi-select-label">Skillset</InputLabel>
      <Select
        labelId="multi-select-label"
        id="skillset"
        name="skillset"
        multiple // This is the key prop for multi-select
        value={selectedSkillNames}
        onChange={handleSkillSelect}
        renderValue={(skillset: string[] | null) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {skillset &&
              skillset.map((value) => {
                return <Chip key={value} label={value} />;
              })}
          </Box>
        )}>
        {availableSkills
          .filter((skill) => skill.name)
          .map((skill) => (
            <MenuItem key={skill.id} value={skill.name || ''}>
              {skill.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SkillSelect;
